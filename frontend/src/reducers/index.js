import { combineReducers } from "redux";
import messages from "./messages";
import auth from "./auth";
import errors from "./errors";
import subreddits from "./subreddits";

export default combineReducers({
  reducerMessages: messages,
  reducerAuth: auth,
  reducerErrors: errors,
  reducerSubreddits: subreddits
});
