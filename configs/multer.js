// const multer = require("multer");

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
//   },
// });

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.split("/")[1] === "eml") {
//     cb(null, true);
//   } else {
//     cb(new Error("Not an EML File!!"), false);
//   }
// };

