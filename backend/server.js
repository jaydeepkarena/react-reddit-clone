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
const fs = require('fs');
const { Post, validatePost } = require('./models/posts');
const { GetNewFileName } = require('./helper');
const multer = require('multer');

// require('express-async-errors');

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
app.use(function(err, req, res, next) {
  console.log('ERRRORORORORORR >>> ', err);
  next();
});

process.on('unhandledRejection', err => console.log(err));

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, GetNewFileName(file.originalname));
  }
});
const upload = multer({ storage });

app.post('/new-post', upload.single('image'), async (req, res) => {
  console.log(`req.body >>>`)
  console.log(req.body)
  console.log(`req.file >>>`)
  console.log(req.file)
  let image = '';
  if (req.file) {
    image = req.file.path;
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
    console.log(password);

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
  console.log(users);
  res.send(users);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
