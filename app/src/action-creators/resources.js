import { SET_RESOURCES } from '../constants'
import fetch from 'isomorphic-fetch'

const url = 'http://localhost:5000/resources'

export const getResources = async (dispatch, getState) => {
  const resources = await fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err))

  dispatch({ type: SET_RESOURCES, payload: resources })
}
