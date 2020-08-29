import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { listReducer } from "./reducers";
import thunk from "redux-thunk";

const store = createStore(
  listReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

let timeOut;
store.subscribe(() => {
  clearTimeout(timeOut);
  timeOut = setTimeout(() => {
    console.log("timout");
  }, 5000);
});

export { store };
