#!/usr/bin/env node
"use strict";
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const node_xlsx_1 = require("node-xlsx");
const fs = require("fs");
const https = require("https");
const Nuxt = require("nuxt");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const fileUpload = require("express-fileupload");
const school_1 = require("./school");
const isDev = process.env.NODE_ENV !== "production";
const WHITELIST = process.env.EMAIL_WHITELIST.split(",");
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CONSUMER_KEY,
    clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, function (token, tokenSecret, profile, done) {
    if (profile.emails.some(isWhiteList)) {
        done(null, profile);
    }
    else {
        done(`Not authorized user attempting to login. ${JSON.stringify(profile)}`);
    }
}));
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
function isWhiteList(email) {
    return WHITELIST.includes(email.value);
}
mongoose.Promise = require("bluebird");
mongoose.connect("mongodb://localhost:27017/schools");
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
    };
}
catch (err) {
    console.log(err.message);
    console.log("TLS/SSL will not be available");
}
let nuxtConfig = require("./nuxt.config.js");
nuxtConfig.dev = isDev;
let nuxt = new Nuxt(nuxtConfig);
nuxt.build().then(() => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
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
internalRouter.use(session({
    secret: process.env.SESSION_SECRET,
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
internalRouter.get("/login", passport.authenticate("google", {
    scope: [
        "profile",
        "https://www.googleapis.com/auth/plus.profile.emails.read"
    ]
}));
internalRouter.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    res.redirect("/");
});
internalRouter.post("/schools/upload", function (req, res) {
    let sampleFile;
    if (!req["files"]) {
        res.send("No files were uploaded.");
        return;
    }
    sampleFile = req["files"].sampleFile;
    sampleFile.mv("./myFile.xlsx", function (err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            let workSheetsFromFile;
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
internalRouter.post("/schools", function (req, res) {
    let schoolData = new school_1.SchoolDb(req.body);
    schoolData.save(function (err, doc) {
        if (err) {
            res.status(400).end();
            console.log(err);
            return;
        }
        res.redirect("/");
    });
});
publicRouter.get("/schools", function (req, res) {
    school_1.SchoolDb.find({}, function (err, doc) {
        res.json(doc);
    });
});
publicRouter.get("/schools/:id", function (req, res) {
    school_1.SchoolDb.findOne({ "_id": req.params.id }, function (err, doc) {
        res.json(doc ? doc : {});
    });
});
