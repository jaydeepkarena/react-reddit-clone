import React, { useRef } from 'react';

const SignUp = () => {
  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const confirmPasswordRef = useRef('');

  const submit = () => {
    console.log(nameRef.current.value);
    console.log(emailRef.current.value);
    console.log(passwordRef.current.value);
    console.log(confirmPasswordRef.current.value);
  };

  const reset = () => {
    nameRef.current.value = '';
    emailRef.current.value = '';
    passwordRef.current.value = '';
    confirmPasswordRef.current.value = '';
  };

  return (
    <>
      <h1 className="signup"> SignUp Component </h1>
      <div className="signup-items">
        <div className="control-group">
          <label htmlFor="name"> Name: </label>
          <input type="text" name="name" id="name" ref={nameRef} />
        </div>
        <div className="control-group">
          <label htmlFor="email"> Email: </label>
          <input type="text" name="email" id="email" ref={emailRef} />
        </div>
        <div className="control-group">
          <label htmlFor="password"> Password: </label>
          <input type="password" name="password" id="password" ref={passwordRef} />
        </div>
        <div className="control-group">
          <label htmlFor="password2"> Confirm Password: </label>
          <input type="password" name="password2" id="password2" ref={confirmPasswordRef} />
        </div>
        <div className="control-group">
          <button onClick={submit}> Submit </button>
          <button onClick={reset}> Reset </button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
