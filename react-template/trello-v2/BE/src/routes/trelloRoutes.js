const router = require("express").Router();
const authenticate = require("../middlewares/authentication");
const {
  createTrelloBoard,
  updateTrelloBoardName,
  viewTrelloBoard,
  viewAllTrelloBoardsNames,
  deleteTrelloBoard,
  updateTrelloBoard
} = require("../controllers/trelloControllers");

// ---------------get routes----------------------
router.get(
  "/api/view-trello-board/:trelloBoardId",
  authenticate,
  viewTrelloBoard
);
router.get(
  "/api/view-all-trello-board-names",
  authenticate,
  viewAllTrelloBoardsNames
);

// ---------------post routes----------------------
router.post("/api/create-trello-board", authenticate, createTrelloBoard);

// ---------------update routes----------------------
router.patch(
  "/api/update-trello-board-name/:trelloBoardId",
  authenticate,
  updateTrelloBoardName
);
router.patch(
  "/api/update-trello-board/:trelloBoardId",
  authenticate,
  updateTrelloBoard
);

// ---------------delete routes----------------------
router.delete(
  "/api/delete-trello-board/:trelloBoardId",
  authenticate,
  deleteTrelloBoard
);

module.exports = router;
