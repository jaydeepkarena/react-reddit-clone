import Joi from '@hapi/joi';
import { sentLoginRequest, loginSuccessfull, loginError } from '../actions';
import API from '../../utils/api'

const authenticateUser = (email, password) => {
  return (dispatch, getState) => {
    // validate string
    const { error } = validate(email, password);
    if (error) {
      console.log(error.details[0].message);
      dispatch(loginError(error.details[0].message));
      return;
    }

    dispatch(sentLoginRequest());

    API
      .post('auth/login', { email, password })
      .then(data => {
        dispatch(loginSuccessfull(data.data));
      })
      .catch(err => {
        dispatch(loginError(err.response.data));
      });
  };
};

const validate = (email, password) => {
  const schema = {
    email: Joi.string().required(),
    password: Joi.string()
      .min(5)
      .max(255)
  };
  return Joi.validate({ email, password }, schema);
};

export default authenticateUser;
