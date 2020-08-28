import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { listReducer } from "./reducers";

const store = createStore(listReducer, composeWithDevTools());

export { store };
