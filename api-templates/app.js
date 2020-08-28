// NPM packages
const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./db"); //importing Database config Module

const app = express(); //creating express app
app.use(cors()); //removal of cors error in browser
app.use(express.urlencoded({ extended: true })); //url parser
app.use(express.json()); //body parser

app.get("/", (req, res) =>
  res.json({ message: "Hi, This is an API for ganesha_photography_api" })
); // home route welcome message

//Routes importing and using
app.use(require("./api/routes/adminRoutes"));
app.use(require("./api/routes/editorRoutes"));
app.use(require("./api/routes/customerRoutes"));

module.exports = app; //exporting app to server
