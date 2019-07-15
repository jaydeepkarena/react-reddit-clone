const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { User, validateUser } = require('./models/user');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const saltRounds = 10;

require('express-async-errors');

mongoose
  .connect('mongodb://localhost/react-reddit-clone', { useNewUrlParser: true })
  .then(() => console.log('Successfully connected to MongoDb...'))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.use(function(err, req, res, next) {
  console.log('ERRRORORORORORR : ', err);
  next();
});

process.on('unhandledRejection', err => console.log(err));

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
