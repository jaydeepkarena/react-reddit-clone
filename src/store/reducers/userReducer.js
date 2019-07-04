import { USER_LOGIN } from '../actionTypes';

const initialState = {
  users: {},
  currentUserId: '',
  currentUserName: '',
  currentUserEmail: ''
};

const userReducer = (state = initialState, action) => {
  switch (action.key) {
    case USER_LOGIN:
      const user = Object.keys(state);
      console.log(user);
      return state;
    default:
      return state;
  }
};

export default userReducer;
