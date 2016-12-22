#!/usr/bin/env node
"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
var node_xlsx_1 = require("node-xlsx");
var school_1 = require("./school");
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/schools');
var port = process.env.PORT || 8080;
var app = express();
var router = express.Router();
app.use('/', express.static(path.join(__dirname, './public/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);
app.listen(port, function () {
    console.log('listening on ${port}');
});
var fileUpload = require('express-fileupload');
// default options 
router.use(fileUpload());
router.post('/upload', function (req, res) {
    var sampleFile;
    if (!req['files']) {
        res.send('No files were uploaded.');
        return;
    }
    sampleFile = req['files'].sampleFile;
    sampleFile.mv('./myFile.xlsx', function (err) {
        if (err) {
            console.log("hre");
            res.status(500).send(err);
        }
        else {
            // Parse a file 
            var workSheetsFromFile;
            try {
                workSheetsFromFile = node_xlsx_1["default"].parse(__dirname + "/myFile.xlsx");
            }
            catch (err) {
                res.status(500).send(err);
                return;
            }
            var school = req.body.school;
            var link = req.body.link;
            var schoolData = new school_1.SchoolDb({
                school: school,
                link: link
            });
            workSheetsFromFile.forEach(function (x) {
                schoolData['data'] = x.data;
            });
            schoolData.save(function (err, doc) {
                if (err) {
                    res.status(400).end();
                    console.log(err);
                    return;
                }
            });
            console.log(schoolData);
            res.redirect('/');
        }
    });
});
router.get("/schools", function (req, res) {
    school_1.SchoolDb.find({}, function (err, doc) {
        res.json(doc);
    });
});
router.get("/schools/:id", function (req, res) {
    school_1.SchoolDb.findOne({ "school": req.params.id }, function (err, doc) {
        res.json(doc ? doc : {});
    });
});
router.use(function (req, res, next) {
    console.log(new Date(Date.now()).toLocaleString(), req.method, req.originalUrl);
    next();
});
