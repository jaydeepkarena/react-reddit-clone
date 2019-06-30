import React from 'react';

const Login = props => {
  return (
    <>
      <h2>Login</h2>
      <lable for="username">Username:</lable>
      <input type="text" name="username" id="username" />
      <lable for="password">Password:</lable>
      <input type="text" name="password" id="password" />
      <button>Login</button>
    </>
  );
};

export default Login;
