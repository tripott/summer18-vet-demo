import {
  NEW_EVENT_FORM_UPDATED,
  NEW_EVENT_SAVE_STARTED,
  NEW_EVENT_SAVE_ERROR,
  NEW_EVENT_SAVE_SUCCESS,
  NEW_EVENT_CLEARED
} from "../constants"

import { merge, mergeDeepRight } from "ramda"

/*
{
    name: "Veteran Bike Week",
    shortDesc: "Ride from Myrtle Beach to Hilton Head",
    primaryPhone: "843-727-4525",
    eventDateTime: "2018-08-04T08:00:00-05:00"
  }
  */
const now = new Date()
const today = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`

const newEventInitialState = {
  data: {
    name: "",
    shortDesc: "",
    primaryPhone: "",
    eventDateTime: today
  },
  isError: false,
  isSaving: false,
  errorMsg: ""
}

export const newEvent = (state = newEventInitialState, action) => {
  switch (action.type) {
    case NEW_EVENT_FORM_UPDATED:
      return mergeDeepRight(state, { data: action.payload })
    case NEW_EVENT_SAVE_STARTED:
      return merge(state, {
        isError: false,
        isSaving: true,
        errorMsg: ""
      })
    case NEW_EVENT_SAVE_ERROR:
      return merge(state, {
        isError: true,
        isSaving: false,
        errorMsg: action.payload
      })
    case NEW_EVENT_SAVE_SUCCESS:
      return newEventInitialState
    case NEW_EVENT_CLEARED:
      return newEventInitialState
    default:
      return state
  }
}

/*
const eventsInitialState = {
  data: [],
  isLoading: false,
  isError: false,
  errorMsg: ""
}

export const events = (state = eventsInitialState, action) => {
  switch (action.type) {
    case EVENTS_RETRIEVED:
      return merge(state, {
        data: action.payload,
        isLoading: false,
        isLoadingError: false,
        errorMsg: ""
      })
    case EVENTS_LOADING_ERROR:
      return merge(state, {
        data: [],
        isLoading: false,
        isLoadingError: true,
        errorMsg: action.payload
      })

    default:
      return state
  }
}

const currentEventInitialState = {
  data: {},
  isLoading: false,
  isError: false,
  isSaving: false,
  isSavingError: false,
  errorMsg: ""
}

export const currentEvent = (state = currentEventInitialState, action) => {
  switch (action.type) {
    case CURRENT_EVENT_FORM_UPDATED:
        return mergeDeepRight(state, {data: action.payload })

    case CURRENT_EVENT_RETRIEVED:
      return merge(state, {
        data: action.payload,
        isLoading: false,
        isLoadingError: false,
        isSaving: false,
        isSavingError: false,
        errorMsg: ""
      })
    case CURRENT_EVENT_FETCH_STARTED:
      return merge(state, {
        isLoading: true,
        isLoadingError: false,
        isSaving: false,
        isSavingError: false,
        errorMsg: ""
      })
    case CURRENT_EVENT_LOADING_ERROR:
      return merge(state, {
        data: {},
        isLoading: false,
        isLoadingError: true,
        isSaving: false,
        isSavingError: false,
        errorMsg: action.payload
      })
    case CURRENT_EVENT_SAVE_STARTED:
      return merge(state, {
        isLoading: false,
        isLoadingError: false,
        isSaving: true,
        isSavingError: false,
        errorMsg: ""
      })
    case CURRENT_EVENT_SAVE_ERROR:
      return merge(state, {
        isLoading: false,
        isLoadingError: false,
        isSaving: false,
        isSavingError: true,
        errorMsg: action.payload
      })

    case CURRENT_EVENT_SAVE_SUCCESS:
      return currentEventInitialState
    case CURRENT_EVENT_CLEARED:
      return currentEventInitialState
    default:
      return state
  }
}
*/
