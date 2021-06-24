const express = require("express");
const router = express.Router();
const multer =require("multer");
const fs = require('fs');
const File = require('../models/file-model');
const emlformat = require('eml-format');
const axios = require('axios');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
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

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});


router.post("/api/postfiles", upload.single('file'), async (req, res) => {
  // Stuff to be added later
  console.log(req.file);
  try {
    const newFile = await File.create({
      name: req.file.filename,
  });
  res.status(200).json({
    status: "success",
    message: "File created successfully!!",
  });
} catch (error) {
    res.json({
      error,
  });
}
});

module.exports = router;

// router.post("/postfiles", obj (req, res) => { 
//   try {
//     const createFileDB = await Files.create({
//       uploadData
//     })
//     const files = req.body.uploadData;
//       console.log(files);
//     fs.readFileSync( req.body.uploadData, "utf-8"),
//       emlformat.read(eml, function(error, data) {
//         if (error) return console.log(error);
//         fs.writeFileSync("sample.json", JSON.stringify(data, " ", 2));
//           console.log(data);
//     });
//   } catch (e) {
//     res.status(500).json(`error occurred ${e}`);
//   }
// });

// //Get all projects
// router.get("/projects", async (req, res) => {
//   try {
//     const allProjects = await Project.find();
//     res.status(200).json(allProjects);
//   } catch (e) {
//     res.status(500).json(`error occurred ${e}`);
//   }
// });

// //Create project
// router.post("/projects", async (req, res) => {
//   const { title, description, imageUrl } = req.body;
//   if (!title || !description || !imageUrl) {
//     res.status(400).json("missing fields");
//     return;
//   }

//   try {
//     const response = await Project.create({
//       title,
//       description,
//       imageUrl,
//     });
//     res.status(200).json(response);
//   } catch (e) {
//     res.status(500).json(`error occurred ${e}`);
//   }
// });

// //Delete project
// router.delete("/projects/:id", async (req, res) => {
//   try {
//     await Project.findByIdAndRemove(req.params.id);
//     res.status(200).json(`project with id ${req.params.id} deleted.`);
//   } catch (e) {
//     res.status(500).json(`error occurred ${e}`);
//   }
// });

// //Get by Id
// router.get("/projects/:id", async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     res.status(200).json(project);
//   } catch (e) {
//     res.status(500).json(`error occurred ${e}`);
//   }
// });

// //Update project
// router.put("/projects/:id", async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     await Project.findByIdAndUpdate(req.params.id, {
//       title,
//       description,
//     });
//     res.status(200).json(`project with id ${req.params.id} was updated.`);
//   } catch (e) {
//     res.status(500).json(`error occurred ${e}`);
//   }
// });


