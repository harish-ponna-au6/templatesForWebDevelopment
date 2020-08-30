import {
  VIEW_ALL_TRELLO_BOARDS_NAMES,
  EDIT_A_BOARD_NAME,
  DELETE_A_BOARD,
  ADD_A_BOARD
} from "../actionTypes";

const trelloBoardNamesState = [];

const trelloBoardNamesReducer = (state = trelloBoardNamesState, action) => {
  const { type, payload } = action;

  switch (type) {
    case VIEW_ALL_TRELLO_BOARDS_NAMES:
      return [...payload];
    case EDIT_A_BOARD_NAME:
      const newState = state.map((board) => {
        if (payload._id === board._id) return { ...board, name: payload.name };
        else return board;
      });
      return newState;
    case DELETE_A_BOARD: {
      const newState = state.filter((board) => payload !== board._id);
      return newState;
    }
    case ADD_A_BOARD:
      return [...state, payload];
    default:
      return state;
  }
};

export { trelloBoardNamesReducer };
