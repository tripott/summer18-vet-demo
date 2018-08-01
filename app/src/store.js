import { createStore, combineReducers, applyMiddleware } from 'redux'
import { drawer } from './reducers/drawer'
import { resources, currentResource } from './reducers/resources'
import thunk from 'redux-thunk'
import { fetching } from './reducers/fetching'

const store = createStore(
  combineReducers({ drawer, resources, currentResource, fetching }),
  applyMiddleware(thunk)
)

export default store
