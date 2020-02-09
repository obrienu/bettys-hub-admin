import { CLEAR_ERRORS, GET_ERRORS } from "./error.types";

export const getError = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  };
};

export const clearError = () => {
  return {
    type: CLEAR_ERRORS
  };
};
