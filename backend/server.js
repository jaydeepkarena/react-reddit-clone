const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { User, validateUser } = require('./models/user');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { Post, validatePost } = require('./models/posts');
const { GetNewFileName } = require('./helper');
const multer = require('multer');
const path = require('path');
const Joi = require('./utility/Joi');

// require('express-async-errors');
const errorMiddleWare = (err, req, res, next) => {
  console.log('ERRRORORORORORR >>> ', err);
  next();
};

mongoose
  .connect('mongodb://localhost/react-reddit-clone', {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('Successfully connected to MongoDb...'))
  .catch(err => console.log(`ERRRORORORORORR >>> `, err));

app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorMiddleWare);

process.on('unhandledRejection', err => console.log(err));

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, GetNewFileName(file.originalname));
  }
});
const uploadSingleFile = multer({ storage }).single('image');

app.post('/new-post', uploadSingleFile, async (req, res) => {
  let image = '';
  if (req.file) {
    image = path.normalize(req.file.path);
    console.log(`image path >>> ${image}`);
  }

  const { user, title, description } = req.body;
  const post = { user, title, description, image };

  const { error } = validatePost(post);
  if (error) return res.status(400).send(error.details[0].message);

  let newPost = new Post(post);
  await newPost.save();
  res.send(newPost);
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('name email password');

  if (!user) return res.status(401).send('Invalid email or password!');

  const result = await bcrypt.compare(password, user.password);
  if (!result) return res.status(401).send('Invalid email or password!');

  user.token = jwt.sign({ user }, 'MyPrivateKey');
  await user.save();

  res.send(_.pick(user, ['_id', 'name', 'email']));
});

app.post('/auth/signup', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) return res.status(401).send('User already registered!');

  try {
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    // console.log(password);

    user = new User({ name, email, password: encryptedPassword });
    await user.save();
    return res.send(_.pick(user, ['_id', 'name', 'email']));
  } catch (e) {
    console.log('ERRORORORR:', e);
    return res.send(e);
  }
});

app.get('/auth/users', async (req, res) => {
  const users = await User.find({});
  // console.log(users);
  res.send(users);
});

app.delete('/remove-all-post', async (req, res) => {
  if (!req.body.user) return res.status(401).send('User id not required!');

  // TODO: validate mongodb objectID

  const result = await Post.deleteMany({ user: req.body.user });
  // console.log(result);
  const message = `Deleted ${result.deletedCount} posts!`;
  // console.log(message);
  res.send(message);
});

app.get('/posts', async (req, res) => {
  const posts = await Post.find()
    .sort({ timestamp: -1 })
    .limit(99);
  res.send(posts);
});

app.delete('/post/:_id', async (req, res) => {
  const r = Joi.validate({ _id: Joi.objectId() }, { _id: req.params._id });
  console.log(r);
  return res.send(r);
  if (error) return res.status(401).send(error.details[0].message);
  if (!req.params._id) return res.status(400).send('Please provide post id!');
  const result = mongoose.Types.ObjectId(req.body._id);
  console.log(`Result => `, result);
  return res.send(result);

  const deletedPost = await Post.findByIdAndDelete(req.body._id);

  res.send(deletedPost);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
