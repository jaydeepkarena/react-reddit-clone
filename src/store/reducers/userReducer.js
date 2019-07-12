import { USER_LOGIN, SENT_LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from '../actionTypes';

const initialState = {
  users: {
    '123': {
      id: 123,
      name: 'jaydeep karena',
      email: 'jaydeep7karena7@gmail.com',
      password: '12345'
    }
  },
  currentUserId: '',
  currentUserName: 'Guest',
  currentUserEmail: '',
  loginRequested: false,
  loginError: ''
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // case USER_LOGIN:
    //   return { ...state, currentUserId: 'Test', currentUserName: 'Test' };
    case SENT_LOGIN_REQUEST:
      return { ...state, loginRequested: true };
    case LOGIN_SUCCESS:
      console.log('LOGIN SUCCESS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      return { ...state };
    case LOGIN_ERROR:
      return {...state, loginError: action.data};
    default:
      return state;
  }
};

export default userReducer;
