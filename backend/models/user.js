const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { defaultProfileImage } = require('../utility/utils');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  token: {
    type: String,
    default: ''
  },
  profile_img: {
    type: String,
    default: defaultProfileImage
  }
});

const userModel = mongoose.model('User', userSchema);

const validateUser = user => {
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

module.exports.User = userModel;
module.exports.validateUser = validateUser;
