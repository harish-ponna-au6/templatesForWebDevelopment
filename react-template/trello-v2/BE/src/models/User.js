const { model, Schema } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  trelloBoardsIds: [{ type: Schema.Types.ObjectId, ref: "trelloBoard" }]
});

const User = model("user", UserSchema);

module.exports = User;
