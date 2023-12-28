// to make an http request easy to send http request from web to Server used to communicate with external
// this will allow you to use Axios to make HTTP request
//Application programming interface allow different software to communicate and use data

import axios from "axios";

import {
  ALL_RESTAURANTS_REQUEST,
  ALL_RESTAURANTS_SUCCESS,
  ALL_RESTAURANTS_FAIL,
  CLEAR_ERRORS,
  SORT_BY_RATINGS,
  SORT_BY_REVIEWS,
  TOGGLE_VEG_ONLY,
} from "../constants/restaurantConstant";

export const getRestaurants = () => async (dispatch) => {
  try {
    // message
    dispatch({ type: ALL_RESTAURANTS_REQUEST });
    // link will hold the url of api at end point
    let link = "/api/v1/eats/stores";
    // await is used request can take some time
    // distructuring of objects
    const { data } = await axios.get(link);
    const { restaurants, count } = data;

    // payload contain actual data reterive from the server
    // payload data can be access for updating states in reducers
    dispatch({
      type: ALL_RESTAURANTS_SUCCESS,
      payload: { restaurants, count },
    });
  } catch (error) {
    dispatch({
      type: ALL_RESTAURANTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const sortByRatings = () => {
  return {
    type: SORT_BY_RATINGS,
  };
};

export const sortByReviews = () => {
  return {
    type: SORT_BY_REVIEWS,
  };
};
// we are dispatching here because it gives functions
export const toggleVegOnly = () => (dispatch) => {
  dispatch({ type: TOGGLE_VEG_ONLY });
};

// dispatch is used to sent the action to redux==send,payload will provide additional data
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
