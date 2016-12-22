#!/usr/bin/env node

import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as path from "path";
import xlsx from 'node-xlsx';
import * as fs from "fs";

import { SchoolDb } from "./school";

(mongoose as any).Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/schools');

const port = process.env.PORT || 8080;

const app = express();
const router = express.Router();

app.use('/api', router);
app.use('/', express.static(path.join(__dirname, './public/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// for html5 to remember all locations
app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/public/dist/index.html');
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

var fileUpload = require('express-fileupload');
 
// default options 
router.use(fileUpload());
 
router.post('/schools/upload', function(req, res) {
  var sampleFile;
 
  if (!req['files']) {
    res.send('No files were uploaded.');
    return;
  }
 
  sampleFile = req['files'].sampleFile;
  sampleFile.mv('./myFile.xlsx', function(err) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      // Parse a file 
      var workSheetsFromFile;
      try {
        workSheetsFromFile = xlsx.parse(`${__dirname}/myFile.xlsx`);
        res.json(workSheetsFromFile);
      } catch (err) {
        res.status(500).send(err);
        return;
      }
    }
  });

});

router.post('/schools/', function(req, res) {
  var schoolData = new SchoolDb(req.body);
 
  schoolData.save(function(err, doc) {
    if (err) {
      res.status(400).end();
      console.log(err);
      return;
    }
  });
  res.redirect('/')
});

router.get("/schools", function(req, res) {
  SchoolDb.find({}, function(err, doc) {
    res.json(doc);
  });
});

router.get("/schools/:id", function(req, res) {
  SchoolDb.findOne({"school" : req.params.id}, function(err, doc) {
    res.json(doc ? doc : {});
  });
});

router.use(function (req, res, next) {
  console.log(new Date(Date.now()).toLocaleString(), req.method, req.originalUrl);
  next();
});
