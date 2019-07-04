import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { LoginUser } from '../store/actions';

const Login = props => {
  const emailRef = useRef('');
  const passwordRef = useRef('');

  const Login = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    props.authUser(email, password);
  };

  return (
    <>
      <h2>Login</h2>
      <label htmlFor="email">Email:</label>
      <input type="text" name="email" id="email" ref={emailRef} />
      <label htmlFor="password">Password:</label>
      <input type="text" name="password" id="password" ref={passwordRef} />
      <button onClick={Login}>Login</button>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  authUser: (email, password) => {
    dispatch(LoginUser(email, password));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
