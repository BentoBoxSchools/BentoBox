#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var node_xlsx_1 = require("node-xlsx");
var fs = require("fs");
var Nuxt = require("nuxt");
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");
var fileUpload = require("express-fileupload");
// Business model
var school_1 = require("./school");
// Constants
var INTERNAL_PATH_WHITELIST = [
    "/login",
    "/google/callback"
];
var isDev = process.env.NODE_ENV !== "production";
var WHITELIST = process.env.EMAIL_WHITELIST.split(",");
// PassportJS config
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CONSUMER_KEY,
    clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, function (token, tokenSecret, profile, done) {
    if (profile.emails.some(isWhiteList)) {
        done(null, profile);
    }
    else {
        done("Not authorized user attempting to login. " + JSON.stringify(profile));
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
// Mongo config
mongoose.Promise = require("bluebird");
mongoose.connect("mongodb://localhost:27017/schools");
// Express App config
var port = process.env.PORT || 8080;
var securePort = process.env.SECURE_PORT || 8443;
var app = express();
var internalRouter = express.Router();
var publicRouter = express.Router();
var options = {};
try {
    options = {
        key: fs.readFileSync("./certs/key.pem"),
        cert: fs.readFileSync("./certs/cert.pem")
    };
}
catch (err) {
    console.log(err.message);
    console.log("TLS/SSL will not be available");
}
// Nuxt config
var nuxtConfig = require("./nuxt.config.js");
nuxtConfig.dev = isDev;
var nuxt = new Nuxt(nuxtConfig);
// start web app after front end build process completed
nuxt.build().then(function () {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("/api/internal", internalRouter);
    app.use("/api/public", publicRouter);
    app.use("/", nuxt.render);
    app.listen(port, function () {
        console.log("listening on " + port);
    });
});
// default options
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());
app.use(function (req, res, next) {
    console.log(new Date(Date.now()).toLocaleString(), req.method, req.originalUrl);
    next();
});
// internal router related settings
internalRouter.use(function (req, res, next) {
    if (INTERNAL_PATH_WHITELIST.includes(req.path) ||
        req.isAuthenticated()) {
        next();
    }
    else {
        res.status(403).json({ message: "Not authenciated" });
    }
});
// handlers
internalRouter.get("/login", passport.authenticate("google", {
    scope: [
        "profile",
        "https://www.googleapis.com/auth/plus.profile.emails.read"
    ]
}));
internalRouter.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), function (req, res) {
    res.redirect("/");
});
internalRouter.post("/schools/upload", function (req, res) {
    var sampleFile;
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
            // Parse a file
            var workSheetsFromFile = void 0;
            try {
                workSheetsFromFile = node_xlsx_1["default"].parse(__dirname + "/myFile.xlsx");
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
    return data.map(function (student) {
        return {
            "school": student[1],
            "grade": student[2],
            "account_number": student[3],
            "balance": student[4]
        };
    }).filter(function (studentInfo) {
        return studentInfo.school && studentInfo.grade && studentInfo.account_number &&
            typeof studentInfo.balance === "number";
    });
}
internalRouter.put("/schools/:id", function (req, res) {
    school_1.SchoolDb.update({ "_id": req.params.id }, { $set: req.body }, function (err) {
        if (err) {
            res.status(503).json(err);
            console.error(err);
            return;
        }
        res.status(200).send();
    });
});
internalRouter.post("/schools", function (req, res) {
    var schoolData = new school_1.SchoolDb(req.body);
    schoolData.save(function (err, doc) {
        if (err) {
            res.status(400).end();
            console.log(err);
            return;
        }
        res.status(200).send();
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
