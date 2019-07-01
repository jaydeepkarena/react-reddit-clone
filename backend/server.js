const express = require('express');
const app = express();
const users = require('./data/data');
const Joi = require('@hapi/joi');
const uuid = require('uuid/v4');

app.use(express.json());

app.get('/api/auth', (req, res) => {
  res.send(users);
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

const validateUser = user => {
  const schema = {
    name: Joi.string()
      .required()
      .min(5)
      .max(255),
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
