import {
  GET_SUBREDDITS,
  GET_POSTS,
  GET_USERS,
  GET_POSTSDATA
} from "../actions/types";

const initialState = {
  subreddits: [],
  user: [],
  posts: [],
  postsData: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SUBREDDITS:
      return {
        ...state,
        subreddits: action.payload
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    case GET_POSTSDATA:
      return {
        ...state,
        postsData: [action.payload]
      };
    default:
      return state;
  }
}
