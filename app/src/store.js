import { createStore, combineReducers, applyMiddleware } from "redux"
import { drawer } from "./reducers/drawer"
import { newEvent } from "./reducers/events"
import thunk from "redux-thunk"

const store = createStore(
  combineReducers({ drawer, newEvent }),
  applyMiddleware(thunk)
)

export default store
