require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const multer = require("multer");
const passport = require("passport");
const cors = require("cors");
const filesRoutes = require("./routes/file-routes");
//Include passport configuration
// require("./configs/passport");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);
const app = express();


// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true 
  })
);
app.use(express.static(`${__dirname}/uploads`));

app.use(cookieParser());
//allows heroku to recieve connection from other websites
app.set("trust proxy", 1);
//Initialize passport
app.use(passport.initialize());
//Connect passport to the session
app.use(passport.session());
// default value for title local
app.locals.title = "EML-XP project";
app.use(
  cors({
    // credentials: true,
    origin: [process.env.CLIENT_HOSTNAME],
  })
);

const index = require("./routes/index");
app.use("/", index);

const files = require("./routes/file-routes");
app.use("/api", files);

const auth = require("./routes/auth-routes");
app.use("/api", auth);

module.exports = app;

// Session setup
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     saveUninitialized: true,
//     resave: false,
//     cookie: {
//       sameSite: true, //the client is on the same domain as the server
//       secure: false, //not using https
//       httpOnly: true, //not using https (only http)
//       maxAge: 600000, //expiration time in milliseconds
//     },
//     rolling: true, //session gets refreshed with interactions
//   })
// );