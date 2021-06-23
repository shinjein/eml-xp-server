const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  title: String,
  description: String,
  imageUrl: String,
});

const File = mongoose.model("File", fileSchema);

module.exports = File;