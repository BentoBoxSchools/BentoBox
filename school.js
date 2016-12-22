"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;
var SchoolSchema = new Schema({
    school: String,
    link: String,
    data: [[String]]
});
exports.SchoolDb = mongoose.model("schools", SchoolSchema);
