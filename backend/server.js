const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { User } = require('./models/user');

mongoose.connect('mongod://localhost:27017/react-reddit-clone', { useNewUrlParser: true });

app.use(express.json());

process.on('', (err) => console.log(err))

app.post('/api/login', async (req, res) => {
  const user = await User.findOne({ email: req.params.email, password: req.params.password });
  if (user) return res.send('Login successful!');

  res.status(400).send('Invalid email or password!');
});

app.post('/api/signup', (req, res) => {
  return res.send('Coming soon....');
  // const { error } = validateUser(req.body);
  // console.log(error.details[0].message);
  // if (error) {
  //   return res.send(error.details[0].message);
  // }
  // const newId = uuid();
  // const newUser = { [newId]: { ...req.body, id: newId } };
  // users = { ...users, ...newUser };
  // res.send(newuser);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
