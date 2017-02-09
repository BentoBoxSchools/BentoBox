#!/usr/bin/env node

import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as path from "path";
import xlsx from "node-xlsx";
import * as fs from "fs";
import * as Nuxt from "nuxt";
const fileUpload = require("express-fileupload");

import { SchoolDb } from "./school";

const isDev = process.env.NODE_ENV !== "production";

let nuxtConfig = require("./nuxt.config.js");
nuxtConfig.dev = isDev;
let nuxt = new Nuxt(nuxtConfig);

(mongoose as any).Promise = require("bluebird");
mongoose.connect("mongodb://localhost:27017/schools");

const port = process.env.PORT || 8080;

const app = express();
const router = express.Router();

nuxt.build().then(() => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use("/api", router);
  app.use("/", nuxt.render);

  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });
});

// default options
router.use(fileUpload());
router.use(function (req, res, next) {
  console.log(new Date(Date.now()).toLocaleString(), req.method, req.originalUrl);
  next();
});

router.post("/schools/upload", function(req, res) {
  let sampleFile;

  if (!req["files"]) {
    res.send("No files were uploaded.");
    return;
  }

  sampleFile = req["files"].sampleFile;
  sampleFile.mv("./myFile.xlsx", function(err) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      // Parse a file
      let workSheetsFromFile;
      try {
        workSheetsFromFile = xlsx.parse(`${__dirname}/myFile.xlsx`);
        res.json(cleanXL(workSheetsFromFile));
      } catch (err) {
        res.status(500).send(err);
        return;
      }
    }
  });

});

function cleanXL(workSheetsFromFile) {
  let data = workSheetsFromFile[0].data;

  let students = [];
  data.forEach(function(student) {
    let studentInfo = {
      "school": student[1],
      "grade": student[2],
      "account_number": student[3],
      "balance": student[4]
    };

    if (!studentInfo.school ||
      !studentInfo.grade ||
      !studentInfo.account_number ||
      typeof studentInfo.balance !== "number") {
        console.log("weeding out bad data", studentInfo);
    } else {
      students.push(studentInfo);
    }
  });

  return students;
}

router.post("/schools", function(req, res) {
  let schoolData = new SchoolDb(req.body);

  schoolData.save(function(err, doc) {
    if (err) {
      res.status(400).end();
      console.log(err);
      return;
    }
  });
  res.redirect("/");
});

router.get("/schools", function(req, res) {
  SchoolDb.find({}, function(err, doc) {
    res.json(doc);
  });
});

router.get("/schools/:id", function(req, res) {
  SchoolDb.findOne({"_id" : req.params.id}, function(err, doc) {
    res.json(doc ? doc : {});
  });
});
