import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "typeface-roboto";
import store from "./store";
import { Provider } from "react-redux";
import { setCategories } from "./action-creators/categories";
import { getResources } from './action-creators/resources'


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

store.dispatch(setCategories);
store.dispatch(getResources)

