import * as actionTypes from '../actionTypes';

const initialState = {
  users: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.key) {
    case actionTypes.ADD_USER:
      if (Object.values(state.users).some(u => u.email === action.email))
        throw new Error('User already available with this email id');
      return state;
    // case actionTypes.AUTH:
    //     if (Object.values(state.users).some(u => u.email === action.email && u.password === action.password))
    //     {

    //     }
    default:
      return state;
  }
};

export default userReducer;
