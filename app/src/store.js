import { createStore, combineReducers, applyMiddleware } from "redux";
import { drawer } from "./reducers/drawer";
import { categories, currentCategory } from "./reducers/categories";
import thunk from "redux-thunk";

const store = createStore(
  combineReducers({ drawer, categories, currentCategory }),
  applyMiddleware(thunk)
);

export default store;
