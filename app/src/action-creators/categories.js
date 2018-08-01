import fetch from "isomorphic-fetch";
import { SET_CATEGORIES, GET_CATEGORY } from "../constants";
const url = "http://localhost:5000/categories";

export const getCategory = id => async (dispatch, getState) => {
  const category = await fetch(url + `/` + id)
    .then(res => res.json())
    .catch(err => console.log(err));

  dispatch({ type: GET_CATEGORY, payload: category });
};

export const setCategories = async (dispatch, getState) => {
  const categories = await fetch(url).then(res => res.json());
  dispatch({ type: SET_CATEGORIES, payload: categories });
};
