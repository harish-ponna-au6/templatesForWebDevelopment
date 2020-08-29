const { model, Schema } = require("mongoose");

const TrelloBoardSchema = Schema({
  name: {
    type: String,
    require: true
  },
  trellos: {
    type: Array,
    required: true
  }
});

const TrelloBoard = model("trelloBoard", TrelloBoardSchema);

module.exports = TrelloBoard;
