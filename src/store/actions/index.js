import { USER_LOGIN } from '../actionTypes';
export function LoginUser(email, password) {
  return {
    type: USER_LOGIN,
    payload: { email, password }
  };
}
