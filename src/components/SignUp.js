import React, { useRef, useState } from 'react';

import Joi from '@hapi/joi';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './SignUp.css';
import loader from './../assets/images/logo.svg';

const SignUp = props => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const confirmPasswordRef = useRef('');

  const submit = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    const user = { name, email, password, confirmPassword };

    setError('');
    const { error } = validate(user);
    if (error) {
      setError(error.details[0].message);
      return;
    }

    setLoading(true);
    axios
      .post('http://localhost:5000/auth/signup', { name, email, password, confirmPassword })
      .then(data => {
        console.log(data);
        setLoading(false);
        toast.success('Signup successfull!');
        props.history.push('/');
      })
      .catch(err => {
        setLoading(false);
        setError(err.response.data);
      });
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
          {loading && (
            <img src={loader} alt="wait..." className="loader" height="100" width="100" />
          )}
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
