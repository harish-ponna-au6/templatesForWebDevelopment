import {
  ADD_A_LIST,
  ADD_A_CARD,
  DRAG_HAPPENED,
  DELETE_A_LIST,
  DELETE_A_CARD,
  EDIT_A_LIST,
  EDIT_A_CARD,
  VIEW_TRELLO_BOARD
} from "../actionTypes";

const listState = [
  {
    listId: "jhdfh1232",
    title: "first list",
    cards: [{ cardId: "jhighj45", text: "This is first card" }]
  },
  {
    listId: "jfdfnhdfh1232",
    title: "second list",
    cards: [
      { cardId: "jhgffgighj45", text: "this is second card" },
      { cardId: "dfdfsfsjhgffgighj45", text: "this is third card" }
    ]
  }
];

const listReducer = (state = listState, action) => {
  const { type, payload } = action;

  switch (type) {
    case VIEW_TRELLO_BOARD:
      return payload;
    case ADD_A_LIST:
      return [...state, payload];
    case EDIT_A_LIST: {
      const newState = state.map((list) => {
        if (list.listId === payload.listId) {
          return { ...list, title: payload.title };
        } else return list;
      });
      return newState;
    }
    case DELETE_A_LIST:
      const newState = state.filter((list) => list.listId !== payload);
      return newState;

    case ADD_A_CARD: {
      const newState = state.map((list) => {
        if (payload.listId === list.listId) {
          return {
            ...list,
            cards: [...list.cards, payload.card]
          };
        }
        return list;
      });
      return newState;
    }
    case EDIT_A_CARD: {
      const newState = state.map((list) => {
        if (payload.listId === list.listId) {
          const cards = list.cards.map((card) => {
            if (card.cardId === payload.cardId) {
              return { ...card, text: payload.text };
            } else return card;
          });
          return {
            ...list,
            cards: [...cards]
          };
        }
        return list;
      });
      return newState;
    }
    case DELETE_A_CARD: {
      const newState = state.map((list) => {
        if (payload.listId === list.listId) {
          const cards = list.cards.filter(
            (card) => card.cardId !== payload.cardId
          );
          return {
            ...list,
            cards: [...cards]
          };
        }
        return list;
      });
      return newState;
    }

    case DRAG_HAPPENED: {
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        // draggableId,
        type
      } = payload;
      let newState = [...state];
      if (type === "list") {
        const list = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...list);
        return newState;
      }

      if (droppableIdStart === droppableIdEnd) {
        const list = newState.find((list) => list.listId === droppableIdStart);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }
      if (droppableIdStart !== droppableIdEnd) {
        const droppableListStart = newState.find(
          (list) => list.listId === droppableIdStart
        );
        const card = droppableListStart.cards.splice(droppableIndexStart, 1);
        const droppableListEnd = newState.find(
          (list) => list.listId === droppableIdEnd
        );
        droppableListEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }
      return newState;
    }

    default:
      return state;
  }
};

export { listReducer };
