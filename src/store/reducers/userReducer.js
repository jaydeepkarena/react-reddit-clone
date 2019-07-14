import { LOADING, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '../actionTypes';

const initialState = {
  currentUserId: '',
  currentUserName: 'Guest',
  currentUserEmail: '',
  loginRequested: false,
  loginError: ''
};

const userReducer = (state = initialState, action) => {
  console.log('USER REDUCER >>>>>> ACTION');
  console.log(action);
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
        currentUserEmail: action.email
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
        currentUserEmail: ''
      };
    default:
      return state;
  }
};

export default userReducer;
