const express = require("express");
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

module.exports = app;
