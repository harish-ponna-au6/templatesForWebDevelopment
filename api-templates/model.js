// NPM package
const [{ Schema, model }, { tz }] = [require("mongoose"), require('moment-timezone')]

// Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  }

  jsonWebToken: {
    type: String,
  },

}, { timestamps: true });

const User = model("user", UserSchema);

module.exports = User;
