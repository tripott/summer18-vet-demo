import { createStore, combineReducers, applyMiddleware } from 'redux'
import { drawer } from './reducers/drawer'
import { categories, currentCategory } from "./reducers/categories";
import { resources, currentResource } from './reducers/resources'
import thunk from 'redux-thunk'
import { fetching } from './reducers/fetching'

const store = createStore(
  combineReducers({ drawer, resources, currentResource, fetching, categories, currentCategory }),
  applyMiddleware(thunk)
)

export default store;
