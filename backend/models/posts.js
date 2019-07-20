const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    required: false
  }
});

const Post = mongoose.model('post', postSchema);

const validatePost = post => {
  const schema = {
    user: Joi.string()
      .min(5)
      .max(255)
      .required(),
    title: Joi.string()
      .min(5)
      .max(255)
      .required(),
    description: Joi.string(),
    image: Joi.string()
  };
  return Joi.validate(post, schema);
};

module.exports.Post = Post;
module.exports.validatePost = validatePost;
