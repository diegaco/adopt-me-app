import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
//will import index.js from reducers because reducers is a file
// directory and not a file itself. By default will try to import
// index.js
import reducer from "./reducers";

const store = createStore(
  reducer,
  compose(
    //Thunks are for async actions
    applyMiddleware(thunk),
    typeof window === "object" &&
      typeof window.devToolsExtension === "undefined"
      ? window.devToolsExtension()
      : f => f
  )
);

export default store;
