import userReducer from './userReducer';
import currentUserReducer from './currentUserReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  users: userReducer,
  currentUser: currentUserReducer
});

export default rootReducer;
