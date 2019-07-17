import { SUBMITTING_POST, SUBMIT_POST_SUCCESS, SUBMIT_POST_ERROR } from '../actionTypes';

const initialState = {
  posts: [],
  submittingPost: false,
  submitPostError: ''
};

const postsReducer = (state = initialState, action) => {
  console.log('USER REDUCER >>>>>> ACTION');
  console.log(action);
  switch (action.type) {
    case SUBMITTING_POST:
      return { ...state, submittingPost: true, submitPostError: '' };
    case SUBMIT_POST_SUCCESS:
      return { posts: [...state.posts, action.post], submittingPost: false, submitPostError: '' };
    case SUBMIT_POST_ERROR:
      return { ...state, submittingPost: false, submitPostError: action.error };
    default:
      return state;
  }
};

export default postsReducer;
