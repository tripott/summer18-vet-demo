import fetch from "isomorphic-fetch"
import {
  NEW_EVENT_SAVE_ERROR,
  NEW_EVENT_SAVE_SUCCESS,
  NEW_EVENT_SAVE_STARTED
} from "../constants"

const url = process.env.REACT_APP_BASE_URL

export const createNewEvent = history => (dispatch, getState) => {
  dispatch({ type: NEW_EVENT_SAVE_STARTED })

  const newEvent = getState().newEvent.data

  fetch(`${url}/events`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(newEvent)
  })
    .then(res => res.json())
    .then(response => {
      if (!response.ok) {
        dispatch({
          type: NEW_EVENT_SAVE_ERROR,
          payload: "Could not save new event"
        })
      } else {
        dispatch({ type: NEW_EVENT_SAVE_SUCCESS })
        // TODO: dispatch(setEvents)
        // dispatch({ type: IS_ACTIVE, payload: true })
        history.push("/categories")
      }
    })
    .catch(err => {
      dispatch({
        type: NEW_EVENT_SAVE_ERROR,
        payload: "Unexpected Error. Could not save event"
      })

      //dispatch({type: NEW_EVENT_CLEARED})
    })
}

/*
export const getEvent = id => (dispatch, getState) => {
  dispatch({ type: CURRENT_EVENT_LOADING })

  fetch(`${url}/events/${id}`)
    .then(res => res.json())
    .then(event =>
      dispatch({
        type: CURRENT_EVENT_RETRIEVED,
        payload: event
      })
    )
    .catch(err => dispatch({ type: CURRENT_EVENT_LOADING_ERROR }))
}

export const getEvents = (dispatch, getState) => {
  fetch(`${url}/events`)
    .then(res => res.json())
    .then(events => dispatch({ type: EVENTS_RETRIEVED, payload: response }))
    .catch(err =>
      dispatch({
        type: EVENTS_LOADING_ERROR,
        payload: "Error retrieving events."
      })
    )
}
*/
