import * as actionTypes from '../actionTypes';

const initialState = {
  currentUserId: '',
  currentUserEmail: '',
  currentUserName: 'Guest'
};

const currentUserReducer = (state = initialState, action) => {
  switch (action.key) {
    case actionTypes.GET_CURRENT_USER:
      return state;
    case actionTypes.SET_CURRENT_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default currentUserReducer;
