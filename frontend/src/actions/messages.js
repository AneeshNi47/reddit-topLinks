import { CREATE_MESSAGE, GET_ERRORS } from "./types";

//CREATE MESSAGES
export const createMessages = msg => {
  return {
    type: CREATE_MESSAGE,
    payload: msg
  };
};

//RETURN ERRORS
export const returnErrors = (msg, status) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status }
  };
};
