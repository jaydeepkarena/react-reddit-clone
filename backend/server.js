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
const { isValidMongoDbObjectId, setDefaultProfileImage } = require('./utility/utils');

setDefaultProfileImage();

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
  const user = await User.findOne({ email }).select('name email password avatar');

  if (!user) return res.status(400).send('Invalid email or password!');

  const result = await bcrypt.compare(password, user.password);
  if (!result) return res.status(400).send('Invalid email or password!');

  user.token = jwt.sign({ user }, 'MyPrivateKey');
  await user.save();

  res.send(_.pick(user, ['_id', 'name', 'email', 'avatar']));
});

app.post('/auth/signup', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) return res.status(400).send('User already registered!');

  try {
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

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
  if (!req.body.user) return res.status(400).send('User id not required!');

  const user = req.body.user;
  if (!isValidMongoDbObjectId(user)) {
    return res.status(400).status('Provide valid user id!');
  }

  // TODO: validate mongodb objectID

  const result = await Post.deleteMany({ user: req.body.user });
  const message = `Deleted ${result.deletedCount} posts!`;
  res.send(message);
});

app.get('/posts', async (req, res) => {
  const posts = await Post.find()
    .sort({ timestamp: -1 })
    .limit(99);
  res.send(posts);
});

app.delete('/post/:_id', async (req, res) => {
  let responseObje = {
    success: false
  };
  if (!req.params._id) {
    responseObje = { ...responseObje, error: 'Please provide post id!' };
    return res.status(400).send(responseObje);
  }

  const _id = req.params._id;
  if (!isValidMongoDbObjectId(_id)) {
    responseObje = { ...responseObje, error: 'Invalid post id!' };
    return res.status(400).send(responseObje);
  }

  const post = await Post.findById(_id);
  if (!post) {
    responseObje = { ...responseObje, error: 'Post not found with the given id!' };
    res.status(404).send(responseObje);
  }

  await post.remove();
  res.send({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
