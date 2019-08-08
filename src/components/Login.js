import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import authenticateUser from '../store/reducers/loginReducer';
import { loginError } from '../store/actions';
import './Login.css';

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

  const Login = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    props.authenticateUser(email, password);
  };

  const reset = () => {
    emailRef.current.value = '';
    passwordRef.current.value = '';
  };

  if (props.currentUserId) return <Redirect to="/" />;

  return (
    <>
      <div className="login">
        <div className="login-items">
          <h1>Login</h1>
          {props.loginError && <p> {props.loginError} </p>}

          <div className="control-group">
            <label htmlFor="email">Email:</label>
            <input type="text" name="email" id="email" ref={emailRef} />
          </div>
          <div className="control-group">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" ref={passwordRef}
              onKeyDown={ e => e.key === "Enter" && Login()  }
            />
          </div>
          <button onClick={Login}>Login</button>
          <button onClick={reset}>Reset</button>
        </div>
      </div>
    </>
  );
};

const mapStateToPros = ({
  data: { currentUserId, currentUserName, loginRequested, loginError }
}) => ({
  currentUserId,
  currentUserName,
  loginRequested,
  loginError
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
