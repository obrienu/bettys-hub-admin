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

const INITIAL_STATE = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: null,
        isLoading: false,
        user: null
      };

    default:
      return state;
  }
};

export default userReducer;
