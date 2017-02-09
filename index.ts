#!/usr/bin/env node

// libraries
import * as express from "express";
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as path from "path";
import xlsx from "node-xlsx";
import * as fs from "fs";
import * as https from 'https';
import * as Nuxt from "nuxt";
import * as passport from "passport";
const GoogleStrategy = require("passport-google-oauth20");
import * as fileUpload from "express-fileupload";

// Business model
import { SchoolDb } from "./school";

// Constants
const isDev = process.env.NODE_ENV !== "production";
const WHITELIST = process.env.EMAIL_WHITELIST.split(",");

// PassportJS config
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CONSUMER_KEY,
    clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  function(token, tokenSecret, profile, done) {
    if (profile.emails.some(isWhiteList)) {
      done(null, profile);
    } else {
      done(`Not authorized user attempting to login. ${JSON.stringify(profile)}`);
    }
  }
));
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
function isWhiteList(email) {
  return WHITELIST.includes(email.value);
}

// Mongo config
(mongoose as any).Promise = require("bluebird");
mongoose.connect("mongodb://localhost:27017/schools");

// Express App config
const port = process.env.PORT || 8080;
const securePort = process.env.SECURE_PORT || 8443;
const app = express();
const internalRouter = express.Router();
const publicRouter = express.Router();

let options;
try {
  options = {
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem')
  }
} catch (err) {
  console.log(err.message);
  console.log("TLS/SSL will not be available");
}

// Nuxt config
let nuxtConfig = require("./nuxt.config.js");
nuxtConfig.dev = isDev;
let nuxt = new Nuxt(nuxtConfig);

// start web app after front end build process completed
nuxt.build().then(() => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use("/api/internal", internalRouter);
  app.use("/api/public", publicRouter);
  app.use("/", nuxt.render);

  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });

  https.createServer(options, app).listen(securePort, () => {
    console.log(`listening on ${securePort}`);
  });
});

// default options
internalRouter.use(session({
  secret: "Sch00lBent0B0x",
  resave: false,
  saveUninitialized: true
}));
internalRouter.use(passport.initialize());
internalRouter.use(passport.session());
internalRouter.use(fileUpload());
internalRouter.use(function (req, res, next) {
  console.log(new Date(Date.now()).toLocaleString(), req.method, req.originalUrl);
  next();
});

// handlers
internalRouter.get("/login", passport.authenticate("google", {
  scope: [
    "profile",
    "https://www.googleapis.com/auth/plus.profile.emails.read"
  ]
}));
internalRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
     res.redirect("/");
  }
);

internalRouter.post("/schools/upload", function(req, res) {
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

  return data.map(student => {
    return {
      "school": student[1],
      "grade": student[2],
      "account_number": student[3],
      "balance": student[4]
    };
  }).filter(studentInfo => {
    return studentInfo.school && studentInfo.grade && studentInfo.account_number &&
      typeof studentInfo.balance === "number";
  });
}

internalRouter.post("/schools", function(req, res) {
  let schoolData = new SchoolDb(req.body);

  schoolData.save(function(err, doc) {
    if (err) {
      res.status(400).end();
      console.log(err);
      return;
    }
    res.redirect("/");
  });
});

publicRouter.get("/schools", function(req, res) {
  SchoolDb.find({}, function(err, doc) {
    res.json(doc);
  });
});
publicRouter.get("/schools/:id", function(req, res) {
  SchoolDb.findOne({"_id" : req.params.id}, function(err, doc) {
    res.json(doc ? doc : {});
  });
});
