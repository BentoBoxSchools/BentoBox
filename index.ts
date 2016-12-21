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

const app = express();
const router = express.Router();

app.use('/', express.static(path.join(__dirname, './public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', router);

app.listen(8080, () => {
  console.log('listening on 8080');
});

var fileUpload = require('express-fileupload');
 
// default options 
app.use(fileUpload());
 
app.post('/upload', function(req, res) {
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
      // Parse a buffer 
      const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/myFile.xlsx`));
      // Parse a file 
      const workSheetsFromFile = xlsx.parse(`${__dirname}/myFile.xlsx`);

      var school = req.body.school;
      var link = req.body.link;

      var schoolData = new SchoolDb({
        school : school,
        link: link
      });

      workSheetsFromFile.forEach(function (x) {
        schoolData['data'] = x.data;
      });

      schoolData.save(function(err, doc) {
        if (err) {
          res.status(400).end();
          console.log(err);
          return;
        }
      });

      console.log(schoolData);

      res.send('File uploaded!');
    }
  });

});

app.get("/schoolinfo", function(req, res) {
  SchoolDb.find({})
  SchoolDb.find({}, function(err, doc) {
    res.json(doc);
  });
});

app.get("/schoolinfo/:id", function(req, res) {
  SchoolDb.findOne({"school" : req.params.id}, function(err, doc) {
    res.json(doc ? doc : {});
  });
});