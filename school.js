"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
var SchoolSchema = new Schema({
    name: String,
    description: String,
    link: String,
    data: []
});
exports.SchoolDb = mongoose.model("schools", SchoolSchema);
