const { hash, compare } = require("bcrypt");
const User = require("../models/User");
const generateToken = require("../middlewares/generateToken");

module.exports = {
  async registration(req, res) {
    try {
      const { name, email, password } = req.body;

      const emailCheck = await User.findOne({ email });
      if (emailCheck)
        return res
          .status(409)
          .json({ error: { message: "email already exist" } });

      const hashedPassword = await hash(password, 10);

      const user = await new User({
        name,
        email,
        password: hashedPassword
      }).save();

      const token = generateToken(user._id);

      res.status(201).json({ data: { jwt: token } });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: { message: error.message } });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        req.status(400).json({ error: { message: "invalid credentials" } });

      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(401)
          .json({ error: { message: "invalid credentials" } });

      const isMatched = await compare(password, user.password);
      if (!isMatched)
        req.status(401).json({ error: { message: "invalid credentials" } });

      const token = generateToken(user._id);

      res.status(200).json({ data: { jwt: token } });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: { message: error.message } });
    }
  }
};
