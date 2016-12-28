"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;
var SchoolSchema = new Schema({
    name: String,
    description: String,
    link: String,
    data: []
});
exports.SchoolDb = mongoose.model("schools", SchoolSchema);
