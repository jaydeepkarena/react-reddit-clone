import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { LoginUser } from '../store/actions';
import authenticateUser from '../store/reducers/loginReducer';

const Login = props => {
  const emailRef = useRef('');
  const passwordRef = useRef('');

  const Login = e => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    props.authenticateUser(email, password);
  };

  if (props.currentUserId) return <Redirect to="/" />;

  return (
    <>
      <h2>Login</h2>
      {props.loginError && <p> {props.loginError} </p>}
      <label htmlFor="email">Email:</label>
      <input type="text" name="email" id="email" ref={emailRef} />
      <label htmlFor="password">Password:</label>
      <input type="text" name="password" id="password" ref={passwordRef} />
      <input type="submit" onClick={Login} value="Login" />
    </>
  );
};

const mapStateToPros = state => ({
  currentUserId: state.data.currentUserId,
  currentUserName: state.data.currentUserName,
  loginRequested: state.data.loginRequested,
  loginError: state.data.loginError
});

const mapDispatchToProps = dispatch => ({
  authenticateUser: (email, password) => {
    dispatch(authenticateUser(email, password));
  }
});

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(Login);
