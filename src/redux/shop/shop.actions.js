import {
  POST_SHOP_ITEM,
  CLEAR_POST_STATUS,
  SEARCH_CATEGORY,
  CLEAR_CATEGORY,
  CLEAR_SEARCH_ITEM,
  SEARCH_ITEM,
  CLEAR_ITEM
} from "./shop.types";
import axios from "axios";
import { getError } from "../errors/error.action";

const getHeaderConfig = (getState, type) => {
  //getToken from state
  const token = getState().user.token;
  //Header

  let config =
    type === "form"
      ? {
          headers: {
            //"Content-type": "application/x-www-form-urlencoded",
            "Content-type": "form-data"
          }
        }
      : {
          headers: {
            "Content-type": "application/json"
          }
        };
  //if token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};

export const postCommodity = (shop, body) => (dispatch, getState) => {
  dispatch({
    type: CLEAR_POST_STATUS
  });
  dispatch({
    type: CLEAR_ITEM
  });

  axios
    .post(`/api/${shop}`, body, getHeaderConfig(getState))
    .then(res =>
      dispatch({
        type: POST_SHOP_ITEM,
        payload: { status: "Data Posted Successfully", item: res.data }
      })
    )
    .catch(err => {
      dispatch({
        type: POST_SHOP_ITEM,
        payload: err.response.data
      });
    });
};

export const putCommodity = body => (dispatch, getState) => {
  dispatch({
    type: CLEAR_POST_STATUS
  });
  axios
    .put(`/api/${body.shop}/${body.id}`, body, getHeaderConfig(getState))
    .then(res =>
      dispatch({
        type: POST_SHOP_ITEM,
        payload: { status: "Data Edited Successfully", item: res.data }
      })
    )
    .catch(err => {
      dispatch({
        type: POST_SHOP_ITEM,
        payload: err.response.data
      });
    });
};

export const deleteCommodity = body => (dispatch, getState) => {
  dispatch({
    type: CLEAR_POST_STATUS
  });
  axios
    .delete(`/api/${body.shop}/${body.id}`, getHeaderConfig(getState))
    .then(res =>
      dispatch({
        type: POST_SHOP_ITEM,
        payload: { status: res.data }
      })
    )
    .catch(err => {
      dispatch({
        type: POST_SHOP_ITEM,
        payload: err.response.data
      });
    });
};

export const getCategory = shop => (dispatch, getState) => {
  dispatch({
    type: CLEAR_CATEGORY
  });
  axios
    .get(`/api/${shop}/category`, getHeaderConfig(getState))
    .then(res =>
      dispatch({
        type: SEARCH_CATEGORY,
        payload: res.data
      })
    )
    .catch(err => {
      getError(err.response.data, err.response.status, "Search Error");
    });
};

export const searchItems = ({ shop, category, name }, limit, page) => (
  dispatch,
  getState
) => {
  dispatch({
    type: CLEAR_SEARCH_ITEM
  });
  axios
    .get(
      `/api/${shop}/search?page=${page}&limit=${limit}&name=${name}&category=${category}`,
      getHeaderConfig(getState)
    )
    .then(res =>
      dispatch({
        type: SEARCH_ITEM,
        payload: res.data
      })
    )
    .catch(err => {
      getError(err.response.data, err.response.status, "Search Error");
    });
};

export const clearSearchItems = () => dispatch => {
  dispatch({
    type: CLEAR_SEARCH_ITEM
  });
};
