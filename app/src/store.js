import { createStore, combineReducers, applyMiddleware } from 'redux'
import { drawer } from './reducers/drawer'
import { resources } from './reducers/resources'
import thunk from 'redux-thunk'

const store = createStore(
  combineReducers({ drawer, resources }),
  applyMiddleware(thunk)
)

export default store
