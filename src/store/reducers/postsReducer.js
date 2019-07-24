import {
  REQUEST_SENT_FOR_GETTING_POSTS,
  RECEIVE_POSTS_SUCCESS,
  RECEIVE_POSTS_ERROR
} from '../actionTypes';

const initialState = {
  posts: [],
  loading: false,
  error: ''
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SENT_FOR_GETTING_POSTS:
      return { ...state, loading: true, error: '' };
    case RECEIVE_POSTS_SUCCESS:
      return { posts: action.posts, loading: false, error: '' };
    case RECEIVE_POSTS_ERROR:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default postsReducer;
