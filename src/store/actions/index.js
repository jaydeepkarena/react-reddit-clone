import {
  USER_LOGIN,
  LOADING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  REQUEST_SENT_FOR_GETTING_POSTS,
  RECEIVE_POSTS_SUCCESS,
  RECEIVE_POSTS_ERROR
} from '../actionTypes';

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

export function requestPosts() {
  return {
    type: REQUEST_SENT_FOR_GETTING_POSTS
  };
}

export function receivedPosts(posts) {
  return {
    type: RECEIVE_POSTS_SUCCESS,
    posts
  };
}

export function receivedError(error) {
  return {
    type: RECEIVE_POSTS_ERROR,
    error
  };
}
