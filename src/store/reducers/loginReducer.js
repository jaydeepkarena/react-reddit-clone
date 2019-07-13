import { sentLoginRequest, loginSuccessfull, loginError } from '../actions';
import axios from 'axios';

const authenticateUser = (email, password) => {
  return (dispatch, getState) => {
    dispatch(sentLoginRequest());

    axios
      .post('http://localhost:5000/auth/login', { email, password })
      .then(data => {
        dispatch(loginSuccessfull(data.data))
      })
      .catch(err => {
        dispatch(loginError(err));
      });
  };
};
export default authenticateUser;
