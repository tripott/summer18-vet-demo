import { SET_CATEGORIES, GET_CATEGORY } from "../constants";

export const categories = (state = [], action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
};

export const currentCategory = (state = {}, action) => {
  switch (action.type) {
    case GET_CATEGORY:
      return action.payload;
    default:
      return state;
  }
};
