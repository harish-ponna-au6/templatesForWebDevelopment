import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { listReducer } from "./reducers/trellosReducer";
import { userReducer } from "./reducers/userReducer";
import { trelloBoardNamesReducer } from "./reducers/trelloBoardNamesReducers";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  trellos: listReducer,
  trelloBoardNames: trelloBoardNamesReducer,
  user: userReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export { store };
