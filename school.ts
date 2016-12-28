import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;


var SchoolSchema = new Schema({
  name : String,
  description: String,
  link: String,
  data: []
});

export var SchoolDb : mongoose.Model<mongoose.Document> = mongoose.model("schools", SchoolSchema);
