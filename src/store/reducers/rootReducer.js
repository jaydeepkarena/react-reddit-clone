import userReducer from './userReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  data: userReducer,
});

export default rootReducer;
