#!/usr/bin/env node

import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as path from "path";
import xlsx from 'node-xlsx';
import * as fs from "fs";

(mongoose as any).Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/propquiz');

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

      var schoolData = {
        school : school,
        link: link
      }

      workSheetsFromFile.forEach(function (x) {
        x.data.forEach(function(y) {
          schoolData['data'] = y;
        });
      });

      console.log(schoolData);

      res.send('File uploaded!');
    }
  });
});