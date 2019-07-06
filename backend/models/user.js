const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  }
});

const userModel = mongoose.model('User', userSchema);

const validateUser = user => {
  const schema = {
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
      .min(5)
      .max(255)
  };

  return Joi.validate(user, schema);
};

module.exports.User = userModel;
module.exports.validateUser = validateUser;
