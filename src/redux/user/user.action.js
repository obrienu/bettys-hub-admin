import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADING,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_ERROR
} from "./user.types";
import { getError, clearError } from "../errors/error.action";
import axios from "axios";

const getHeaderConfig = getState => {
  //getToken from state
  const token = getState().user.token;
  //Header
  const config = {
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

export const getUser = () => (dispatch, getState) => {
  dispatch({
    type: USER_LOADING
  });

  axios
    .get("/api/user", getHeaderConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      getError(err.response.data, err.response.status);

      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const registerUser = ({
  password,
  cpassword,
  email,
  username,
  mobile,
  adminCode
}) => (dispatch, getState) => {
  dispatch(clearError());
  const config = getHeaderConfig(getState);
  const body = {
    password,
    cpassword,
    email,
    username,
    mobile,
    adminCode
  };
  axios
    .post("/api/user/register", body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(clearError());
    })
    .catch(err => {
      dispatch(
        getError(err.response.data, err.response.status, "Registration Failed")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

export const userLogin = ({ email, password }) => (dispatch, getState) => {
  const config = getHeaderConfig(getState);
  const body = { email, password };
  dispatch(clearError());
  axios
    .post("/api/user/login", body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch(clearError());
    })
    .catch(err => {
      dispatch(
        getError(err.response.data, err.response.status, "Login Failed")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

export const userLogout = () => dispatch => {
  dispatch(clearError());
  dispatch({
    type: LOGOUT_SUCCESS
  });
};
