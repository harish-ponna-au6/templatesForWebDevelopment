const User = require("../models/User");
const TrelloBoard = require("../models/TrelloBoard");

module.exports = {
  async createTrelloBoard(req, res) {
    try {
      const { name } = req.body;
      if (!name) res.status(400).json({ error: { message: "invalid fields" } });

      const trelloBoard = await new TrelloBoard({
        name
      }).save();
      const user = await User.findById(req.user._id);
      user.trelloBoardsIds.push(trelloBoard._id);
      user.save();
      res
        .status(201)
        .json({ success: { message: "successfully create trello board" } });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: { message: error.message } });
    }
  },
  async viewTrelloBoard(req, res) {
    try {
      const { trelloBoardId } = req.params;
      if (!req.user.trelloBoardsIds.includes(trelloBoardId))
        return res
          .status(401)
          .json({ error: { message: "invalid trello board id" } });
      const trelloBoard = await TrelloBoard.findById(trelloBoardId);
      if (!trelloBoard)
        res.status(404).json({ error: { message: "no trello found" } });

      res.status(201).json({
        data: { trelloBoard }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: { message: error.message } });
    }
  },
  async updateTrelloBoardName(req, res) {
    try {
      const { trelloBoardId } = req.params;
      const { name } = req.body;
      if (!name) res.status(400).json({ error: { message: "invalid fields" } });
      if (!req.user.trelloBoardsIds.includes(trelloBoardId))
        return res
          .status(401)
          .json({ error: { message: "invalid trello board id" } });
      await TrelloBoard.findByIdAndUpdate(trelloBoardId, {
        name
      });
      res.status(201).json({
        success: { message: "successfully updated trello board name" }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: { message: error.message } });
    }
  },
  async updateTrelloBoard(req, res) {
    try {
      const { trelloBoardId } = req.params;
      const { trellos } = req.body;
      if (!trellos)
        res.status(400).json({ error: { message: "invalid fields" } });
      if (!req.user.trelloBoardsIds.includes(trelloBoardId))
        return res
          .status(401)
          .json({ error: { message: "invalid trello board id" } });
      await TrelloBoard.findByIdAndUpdate(trelloBoardId, {
        trellos
      });
      res.status(201).json({
        success: { message: "successfully updated trello board" }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: { message: error.message } });
    }
  },

  async deleteTrelloBoard(req, res) {
    try {
      const { trelloBoardId } = req.params;
      if (!req.user.trelloBoardsIds.includes(trelloBoardId))
        return res
          .status(401)
          .json({ error: { message: "invalid trello board id" } });
      await TrelloBoard.findByIdAndDelete(trelloBoardId);
      res.status(200).json({
        success: { message: "trello board deleted successfully" }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: { message: error.message } });
    }
  },
  async viewAllTrelloBoardsNames(req, res) {
    try {
      const user = await User.findById(req.user._id).populate(
        "trelloBoardsIds",
        ["_id", "name"]
      );

      res.status(201).json({
        data: { trelloBoardsNames: user.trelloBoardsIds }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: { message: error.message } });
    }
  }
};
