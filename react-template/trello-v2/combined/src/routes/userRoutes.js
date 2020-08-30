const route = require("express").Router();

const {
  registrationValidation
} = require("../middlewares/registrationValidation");

const { registration, login } = require("../controllers/userControllers");

route.post("/api/register", registrationValidation, registration);
route.post("/api/login", login);

module.exports = route;
