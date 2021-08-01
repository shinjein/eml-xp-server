const multer = require("multer");
const axios = require('axios');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/uploads');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "eml") {
    cb(null, true);
  } else {
    cb(new Error("Not an EML File!!"), false);
  }
};

const upload = multer({ storage: multerStorage }).array("files", 10);

module.exports = upload;
