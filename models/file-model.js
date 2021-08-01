const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  files: {
    type: Array
  },
});

const File = mongoose.model("File", fileSchema);

module.exports = File;