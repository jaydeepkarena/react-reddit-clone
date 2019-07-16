import userReducer from './userReducer';
import postReducer from './postsReducer'
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  data: userReducer,
  posts: postReducer
});

export default rootReducer;
