import { USER_LOGIN, SENT_LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from '../actionTypes';

export function LoginUser(email, password) {
  return {
    type: USER_LOGIN,
    payload: { email, password }
  };
}

export function sentLoginRequest() {
  return {
    type: SENT_LOGIN_REQUEST
  };
}

export function loginSuccessfull({ _id: id, name, email }) {
  return {
    type: LOGIN_SUCCESS,
    id,
    name,
    email
  };
}
export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error
  };
}
