const { sign } = require("jsonwebtoken");

module.exports = (_id) => {
  return sign({ _id }, "trelloBoard", { expiresIn: "1d" });
};
