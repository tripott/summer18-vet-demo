import { SET_RESOURCES, GET_CURRENT_RESOURCE } from '../constants'
import fetch from 'isomorphic-fetch'
const url = process.env.REACT_APP_BASE_URL + '/resources'

export const getResources = async (dispatch, getState) => {
  const resources = await fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err))

  dispatch({ type: SET_RESOURCES, payload: resources })
}

export const getCurrentResource = id => async (dispatch, getState) => {
  const resource = await fetch(url + '/' + id)
    .then(res => res.json())
    .catch(err => console.log(err))

  dispatch({ type: GET_CURRENT_RESOURCE, payload: resource })
}
