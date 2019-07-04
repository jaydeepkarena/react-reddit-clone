import { USER_LOGIN } from '../actionTypes';

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
  currentUserEmail: ''
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      console.log(state);
      const users = Object.keys(state.users);
      const { email, password } = action.payload;
      for (const userId of users) {
        const dbUser = state.users[userId];
        if (dbUser.email === email && dbUser.password === password) {
          console.log('user found');
          console.log(dbUser);
          const newState = {
            ...state,
            currentUserId: dbUser.id,
            currentUserName: dbUser.name,
            currentUserEmail: email
          };
          console.log('new state');
          console.log(newState);
          return newState;
        }
      }
      console.log('user not found');
      return state;
    default:
      return state;
  }
};

export default userReducer;
