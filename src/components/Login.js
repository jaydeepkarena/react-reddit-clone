import React from 'react';

const Login = props => {
  return (
    <>
      <h2>Login</h2>
      <label htmlFor="username">Username:</label>
      <input type="text" name="username" id="username" />
      <label htmlFor="password">Password:</label>
      <input type="text" name="password" id="password" />
      <button>Login</button>
    </>
  );
};

export default Login;
