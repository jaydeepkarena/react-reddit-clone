import { LOADING, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '../actionTypes';
import { imageURL } from '../../utils/config';

const initialState = {
  currentUserId: '',
  currentUserName: 'Guest',
  currentUserEmail: '',
  avatar: '',
  loginRequested: false,
  loginError: ''
};

const userReducer = (state = initialState, action) => {
  // console.log('USER REDUCER >>>>>> ACTION');
  // console.log(action);
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loginRequested: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginRequested: false,
        currentUserId: action.id,
        currentUserName: action.name,
        currentUserEmail: action.email,
        avatar: `${imageURL}${action.avatar}`
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginRequested: false,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loginRequested: false,
        loginError: '',
        currentUserId: '',
        currentUserName: 'Guest',
        currentUserEmail: '',
        avatar: ''
      };
    default:
      return state;
  }
};

export default userReducer;
