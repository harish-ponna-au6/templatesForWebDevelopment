const express = require("express");
const path = require("path");
require("dotenv").config();
require("./db");

const app = express();

app.use(require("cors")());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api", (req, res) =>
  res.status(200).json({ message: "This is a trello board api" })
);

app.use(require("./routes/userRoutes"));
app.use(require("./routes/trelloRoutes"));

app.use(express.static(path.resolve(__dirname,"client","build")))
app.get("*",(req,res)=>res.sendFile(path.resolve(__dirname,"client","build","index.html")))


module.exports = app;
