import { v4 as uuid } from "uuid";
import {
  ADD_A_LIST,
  ADD_A_CARD,
  DRAG_HAPPENED,
  DELETE_A_LIST,
  DELETE_A_CARD,
  EDIT_A_LIST,
  EDIT_A_CARD
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

export {
  addAList,
  addACard,
  dragHappened,
  deleteAList,
  deleteACard,
  editACard,
  editAList
};
