const express = require('express');
const router = express.Router();
const multer = require("multer");
const fs = require('fs');
const simpleParser = require('mailparser').simpleParser;
const File = require('../models/file-model');

const upload = multer({dest: 'uploads'});

router.post("/postfiles", upload.array("files", 10), (req, res, next) => {
  const files = req.files;
    console.log("1. files_posted", files)
  let file_names = [];
  files.forEach( async (file) => {
    let mail = await simpleParser(file.buffer);
    const mail_text = mail.text.substring(0, 500);
    console.log("2. file text extracted", mail_text);
  });
});

  // let mail = await simpleParser(file.buffer);
  // console.log(mail);

// const mail_subject = null;
// if (mail.headers.has('subject')) {
//   const mail_subject = mail.headers.get('subject')
//   console.log("3. subject headers", mail_subject)
// }

// router.get()



module.exports = router;


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


