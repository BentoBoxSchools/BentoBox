#!/usr/bin/env node
"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const node_xlsx_1 = require("node-xlsx");
const Nuxt = require("nuxt");
const school_1 = require("./school");
const isDev = process.env.NODE_ENV !== 'production';
let nuxtConfig = require('./nuxt.config.js');
nuxtConfig.dev = isDev;
let nuxt = new Nuxt(nuxtConfig);
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/schools');
const port = process.env.PORT || 8080;
const app = express();
const router = express.Router();
nuxt.build().then(() => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', router);
    app.use('/', nuxt.render);
    app.listen(port, () => {
        console.log(`listening on ${port}`);
    });
});
var fileUpload = require('express-fileupload');
// default options
router.use(fileUpload());
router.use(function (req, res, next) {
    console.log(new Date(Date.now()).toLocaleString(), req.method, req.originalUrl);
    next();
});
router.post('/schools/upload', function (req, res) {
    var sampleFile;
    if (!req['files']) {
        res.send('No files were uploaded.');
        return;
    }
    sampleFile = req['files'].sampleFile;
    sampleFile.mv('./myFile.xlsx', function (err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            // Parse a file
            var workSheetsFromFile;
            try {
                workSheetsFromFile = node_xlsx_1.default.parse(`${__dirname}/myFile.xlsx`);
                res.json(cleanXL(workSheetsFromFile));
            }
            catch (err) {
                res.status(500).send(err);
                return;
            }
        }
    });
});
function cleanXL(workSheetsFromFile) {
    var data = workSheetsFromFile[0].data;
    var students = [];
    data.forEach(function (student) {
        var studentInfo = {
            "school": student[1],
            "grade": student[2],
            "account_number": student[3],
            "balance": student[4]
        };
        if (!studentInfo.school ||
            !studentInfo.grade ||
            !studentInfo.account_number ||
            typeof studentInfo.balance != 'number') {
            console.log("weeding out bad data", studentInfo);
        }
        else {
            students.push(studentInfo);
        }
    });
    return students;
}
router.post('/schools', function (req, res) {
    var schoolData = new school_1.SchoolDb(req.body);
    schoolData.save(function (err, doc) {
        if (err) {
            res.status(400).end();
            console.log(err);
            return;
        }
    });
    res.redirect('/');
});
router.get("/schools", function (req, res) {
    school_1.SchoolDb.find({}, function (err, doc) {
        res.json(doc);
    });
});
router.get("/schools/:id", function (req, res) {
    school_1.SchoolDb.findOne({ "_id": req.params.id }, function (err, doc) {
        res.json(doc ? doc : {});
    });
});
