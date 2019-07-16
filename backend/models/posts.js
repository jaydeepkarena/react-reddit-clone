const mongoose = require('mongoose');

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
    type: Buffer
  }
});

const Post = mongoose.model('post', postSchema);

module.exports = Post;
