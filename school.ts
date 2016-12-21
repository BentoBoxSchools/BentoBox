import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;


var SchoolSchema = new Schema({
  school : String,
  link: String,
  data: [[String]]
});

export var SchoolDb : mongoose.Model<mongoose.Document> = mongoose.model("schools", SchoolSchema);
