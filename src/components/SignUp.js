import React, { useRef, useState } from 'react';
import Joi from '@hapi/joi';
import './SignUp.css';
import loader from './../assets/images/logo.svg';

const SignUp = () => {
  const [error, setError] = useState('');

  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const confirmPasswordRef = useRef('');

  const submit = () => {
    const user = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value
    };

    console.log('name', nameRef.current.value);
    console.log('email', emailRef.current.value);
    console.log('password', passwordRef.current.value);
    console.log('confirmPassword', confirmPasswordRef.current.value);

    setError('');
    const { error } = validate(user);
    if (error) {
      setError(error.details[0].message);
      return;
    }

    // call API
  };

  const reset = () => {
    nameRef.current.value = '';
    emailRef.current.value = '';
    passwordRef.current.value = '';
    confirmPasswordRef.current.value = '';
  };

  const showErrors = () => {
    if (error) return <div className="error"> {error} </div>;
  };

  return (
    <>
      <div className="signup">
        <div className="signup-items">
          <img src={loader} alt="wait..." className="loader" height="100" width="100" />
          <h1> SignUp </h1>
          {showErrors()}
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
          <button onClick={submit}> Submit </button>
          <button onClick={reset}> Reset </button>
        </div>
      </div>
    </>
  );
};

const validate = user => {
  const schema = {
    name: Joi.string()
      .required()
      .min(5)
      .max(255),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required()
      .min(5)
      .max(255),
    confirmPassword: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .strict()
  };
  return Joi.validate(user, schema);
};

export default SignUp;
