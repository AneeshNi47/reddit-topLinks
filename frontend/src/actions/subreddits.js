import axios from "axios";
import { GET_SUBREDDITS, GET_POSTS, GET_USERS, GET_POSTSDATA } from "./types";
import { returnErrors, createMessages } from "./messages";
import { tokenConfig } from "./auth";

export const getSubreddits = () => (dispatch, getState) => {
  axios
    .get(
      "https://oauth.reddit.com/subreddits/mine/subscriber",
      tokenConfig(getState)
    ) //pass this tokenConfig for private routes to get the user related
    .then(res => {
      dispatch({
        type: GET_SUBREDDITS,
        payload: res.data.data.children
      });
      console.log(res.data.data.children);
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//www.reddit.com/r/redditdev/new/.json?limit=100

export const getPost = subreddit_url => (dispatch, getState) => {
  axios
    .get(`https://www.reddit.com${subreddit_url}.json?limit=100`) //pass this tokenConfig for private routes to get the user related
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data.data.children
      });
      console.log(res.data.data.children);
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getPostData = subreddit_display_name => dispatch => {
  axios
    .get(
      `/api/getPostsData/?subreddit_display_name=${subreddit_display_name}&post_limit=500`
    ) //pass this tokenConfig for private routes to get the user related
    .then(res => {
      dispatch({
        type: GET_POSTSDATA,
        payload: res.data
      });
      console.log(res);
    });
};
