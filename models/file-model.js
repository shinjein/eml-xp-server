const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  file: {
    type: String
  },
});

const File = mongoose.model("File", fileSchema);

module.exports = File;