import { SENT_LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from '../actionTypes';

const initialState = {
  currentUserId: '',
  currentUserName: 'Guest',
  currentUserEmail: '',
  loginRequested: false,
  loginError: ''
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SENT_LOGIN_REQUEST:
      return { ...state, loginRequested: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginRequested: false,
        currentUserId: action.id,
        currentUserName: action.name,
        currentUserEmail: action.email
      };
    case LOGIN_ERROR:
      return { ...state, loginRequested: false, loginError: action.error };
    default:
      return state;
  }
};

export default userReducer;
