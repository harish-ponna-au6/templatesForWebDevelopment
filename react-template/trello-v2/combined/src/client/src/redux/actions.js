import axios from "axios";
import { v4 as uuid } from "uuid";
import {
  ADD_A_LIST,
  ADD_A_CARD,
  DRAG_HAPPENED,
  DELETE_A_LIST,
  DELETE_A_CARD,
  EDIT_A_LIST,
  EDIT_A_CARD,
  VIEW_ALL_TRELLO_BOARDS_NAMES,
  EDIT_A_BOARD_NAME,
  DELETE_A_BOARD,
  ADD_A_BOARD,
  LOGIN_OR_REGISTER,
  VIEW_TRELLO_BOARD,
  LOGOUT
} from "./actionTypes";

const addAList = (title) => ({
  type: ADD_A_LIST,
  payload: {
    listId: uuid(),
    title,
    cards: []
  }
});

const editAList = ({ listId, title }) => ({
  type: EDIT_A_LIST,
  payload: { listId, title }
});

const deleteAList = (listId) => ({ type: DELETE_A_LIST, payload: listId });

const addACard = ({ listId, text }) => ({
  type: ADD_A_CARD,
  payload: {
    listId,
    card: { cardId: uuid(), text }
  }
});
const editACard = ({ listId, cardId, text }) => ({
  type: EDIT_A_CARD,
  payload: { listId, cardId, text }
});
const deleteACard = ({ listId, cardId }) => ({
  type: DELETE_A_CARD,
  payload: { listId, cardId }
});

const dragHappened = ({
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
}) => ({
  type: DRAG_HAPPENED,
  payload: {
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type
  }
});

// User functions

axios.defaults.baseURL = "https://t7tr8.sse.codesandbox.io/api";
const loginOrRegister = (obj) => async (dispatch) => {
  try {
    obj.setIsLoading(true);
    const { data } = await axios({
      url: `/${obj.type}`,
      method: "POST",
      data: obj.user,
      headers: {
        "Content-Type": "application/json"
      }
    });
    obj.setIsLoading(false);
    localStorage.setItem("jwt", data.data.jwt);
    dispatch({ type: LOGIN_OR_REGISTER, payload: null });
    obj.push("/trello-boards");
  } catch (error) {
    obj.setIsLoading(false);
    if (error.response) return alert(error.response.data.error.message);
    console.log(error);
  }
};

const logout = () => ({ type: LOGOUT, payload: null });

const veiwAllTrelloBoardNames = ({ setIsLoading }) => async (dispatch) => {
  try {
    setIsLoading(true);
    const { data } = await axios({
      url: `/view-all-trello-board-names`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt")
      }
    });
    setIsLoading(false);
    return dispatch({
      type: VIEW_ALL_TRELLO_BOARDS_NAMES,
      payload: data.data.trelloBoardsNames
    });
  } catch (error) {
    setIsLoading(false);
    if (error.response) return alert(error.response.data.error.message);
    console.log(error);
  }
};
const editABoardName = (obj) => async (disptach) => {
  try {
    disptach({
      type: EDIT_A_BOARD_NAME,
      payload: { _id: obj.boardId, name: obj.name }
    });
    const { data } = await axios({
      url: `/update-trello-board-name/${obj.boardId}`,
      method: "PATCH",
      data: { name: obj.name },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt")
      }
    });
    console.log(data);
  } catch (error) {
    if (error.response) return alert(error.response.data.error.message);
    console.log(error);
  }
};
const deleteABoard = (boardId) => async (disptach) => {
  try {
    disptach({
      type: DELETE_A_BOARD,
      payload: boardId
    });
    const { data } = await axios({
      url: `/delete-trello-board/${boardId}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt")
      }
    });
    console.log(data);
  } catch (error) {
    if (error.response) return alert(error.response.data.error.message);
    console.log(error);
  }
};
const addABoard = (name) => async (disptach) => {
  try {
    const { data } = await axios({
      url: `/create-trello-board`,
      method: "POST",
      data: { _id: uuid(), name },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt")
      }
    });
    disptach({
      type: ADD_A_BOARD,
      payload: data.data.trelloBoardName
    });
    console.log(data);
  } catch (error) {
    if (error.response) return alert(error.response.data.error.message);
    console.log(error);
  }
};
const viewTrelloBoard = ({ trelloBoardId, setIsLoading }) => async (
  disptach
) => {
  try {
    setIsLoading(true);
    disptach({
      type: VIEW_TRELLO_BOARD,
      payload: []
    });
    const { data } = await axios({
      url: `/view-trello-board/${trelloBoardId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt")
      }
    });
    disptach({
      type: VIEW_TRELLO_BOARD,
      payload: data.data.trelloBoard.trellos
    });

    setIsLoading(false);
    console.log(data);
  } catch (error) {
    setIsLoading(false);
    if (error.response) return alert(error.response.data.error.message);
    console.log(error);
  }
};

export {
  addAList,
  addACard,
  dragHappened,
  deleteAList,
  deleteACard,
  editACard,
  editAList,
  loginOrRegister,
  veiwAllTrelloBoardNames,
  editABoardName,
  deleteABoard,
  addABoard,
  viewTrelloBoard,
  logout
};
