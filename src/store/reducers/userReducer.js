import * as actionTypes from '../actionTypes';

const initialState = {
  currentId: '',
  currentName: 'Guest',
  users: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.key) {
    case actionTypes.ADD_USER:
      if (state.users.some(u => u.email === action.user.email))
        throw new Error('User already available with this email id');
      return { ...state, users: { ...state.user } };
    default:
      return state;
  }
};

export default userReducer;
