import * as mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;


let SchoolSchema = new Schema({
  name : String,
  description: String,
  link: String,
  data: []
});

export const SchoolDb: mongoose.Model<mongoose.Document> = mongoose.model("schools", SchoolSchema);
