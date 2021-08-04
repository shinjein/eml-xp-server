const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new mongoose.Schema({
  title: String,
  path: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const File = mongoose.model("File", fileSchema);

module.exports = File;