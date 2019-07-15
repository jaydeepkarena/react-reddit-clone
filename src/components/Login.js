import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import authenticateUser from '../store/reducers/loginReducer';
import { loginError } from '../store/actions';

const Login = props => {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  useEffect(() => {
    props.clearLoginError('');
  }, [props]);

  useEffect(() => {
    if (props.loginError) {
      toast.error(props.loginError);
    }
  }, [props.loginError]);

  const Login = e => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    props.authenticateUser(email, password);
  };

  if (props.currentUserId) return <Redirect to="/" />;

  // if (props.loginError) return toast.error(props.loginError);

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
  },
  clearLoginError: error => dispatch(loginError(error))
});

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(Login);
