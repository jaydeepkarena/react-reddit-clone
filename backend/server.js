const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { User, validateUser } = require('./models/user');

require('express-async-errors');

mongoose
  .connect('mongodb://localhost/react-reddit-clone', { useNewUrlParser: true })
  .then(() => console.log('Successfully connected to MongoDb...'))
  .catch(err => console.log(err));

app.use(express.json());
app.use(function(err, req, res, next) {
  console.log('ERRRORORORORORR : ', err);
  next();
});

process.on('unhandledRejection', err => console.log(err));

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) return res.send('Login successful!');

  res
    .status(401)
    .setHeader('Access-Control-Allow-Origin', '*')
    .send('Invalid email or password!');
});

app.post('/auth/signup', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { email, password } = req.body;
  let user = await User.findOne({ email, password });
  if (user) return res.status(401).send('User already registered!');

  try {
    user = new User({ email, password });
    await user.save();
    return res.send(user);
  } catch (e) {
    console.log('ERRORORORR:', e);
  }
  return res.send(user);
});

app.get('/auth/users', async (req, res) => {
  const users = await User.find({});
  console.log(users);
  res.send(users);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
