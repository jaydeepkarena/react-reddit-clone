import { USER_LOGIN, LOADING, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from '../actionTypes';

export function LoginUser(email, password) {
  return {
    type: USER_LOGIN,
    payload: { email, password }
  };
}

export function sentLoginRequest() {
  return {
    type: LOADING
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

export function logout() {
  return {
    type: LOGOUT
  };
}
