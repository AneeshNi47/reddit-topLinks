import axios from "axios";
import {
  USER_PROFILE,
  USER_LOADING,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_ERROR
} from "./types";
import { returnErrors, createMessages } from "./messages";

//Login user
export const login = (username, password) => dispatch => {
  var form = new FormData();
  form.append("grant_type", "password");
  form.append("username", username);
  form.append("password", password);
  const config = {
    auth: {
      userAgent: "nogu/0.1 by DontBuyMeGoldGiveBTC",
      username: "Rc-1RVgBBIF1Ig",
      password: "RHqQkn9VdIIKW8vGLbdIwx0USM4"
    }
  };
  axios
    .post("https://www.reddit.com/api/v1/access_token", form, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      console.log(res.data);
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

//GET User Profile
export const getUser = () => (dispatch, getState) => {
  axios
    .get("https://oauth.reddit.com/api/v1/me", tokenConfig(getState)) //pass this tokenConfig for private routes to get the user related
    .then(res => {
      dispatch({
        type: USER_PROFILE,
        payload: res.data
      });
      console.log(res.data);
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//Logout user
export const logoutUser = () => dispatch => {
  dispatch({
    type: LOGOUT_SUCCESS
  });
};

//setup config with token--helper function
export const tokenConfig = getState => {
  const token = getState().reducerAuth.token;
  const config = {
    headers: {}
  };

  if (token) {
    config.headers["Authorization"] = `bearer ${token}`;
  }
  return config;
};
