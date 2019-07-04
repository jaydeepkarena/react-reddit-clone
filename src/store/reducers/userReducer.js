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
      const users = Object.keys(state.users);
      const { email, password } = action.payload;
      for (const userId of users) {
        const dbUser = { ...state.users[userId] };
        if (dbUser.email === email && dbUser.password === password) {
          const newState = {
            users: { ...state.users },
            currentUserId: dbUser.id,
            currentUserName: dbUser.name,
            currentUserEmail: dbUser.email
          };
          return { ...newState };
        }
      }
      return state;
    default:
      return state;
  }
};

export default userReducer;
