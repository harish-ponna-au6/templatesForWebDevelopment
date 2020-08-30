const User = require("../models/User");
const { verify } = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) res.status(401).json({ error: { message: "no token found" } });
    const payload = verify(token, "trelloBoard");
    if (!payload._id)
      res.status(401).json({ error: { message: "invalid token" } });
    const user = await User.findById(payload._id);
    if (!user) res.status(404).json({ error: { message: "no user found" } });
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: { message: error.message } });
  }
};
