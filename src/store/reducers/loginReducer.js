import { sentLoginRequest, loginSuccessfull, loginError } from '../actions';
import axios from 'axios';

const authenticateUser = () => {
  console.log('Inside authenticateUser - redux-thunk');
  return (dispatch, getState) => {
    console.log('Inside authenticateUser');
    dispatch(sentLoginRequest());

    axios
      .post('http://localhost:5000/auth/login', {
        email: 'test@gmail.com',
        password: '12345'
      })
      .then(data => {
        console.log(data);
        // dispatch(loginSuccessfull)
      })
      .catch(err => {
        console.log(err);
        // dispatch(loginError);
      });
  };
};
export default authenticateUser;
