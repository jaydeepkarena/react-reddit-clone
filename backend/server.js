const express = require('express');
const app = express();
const users = require('./data/data');
const Joi = require('@hapi/joi');

app.get('/auth', (req, res) => {
  res.send(users);
});

app.post('/signup', (req, res) => {
  const { error } = validateUser(req.params);
  console.log(error);
  if (error) {
    res.send('ERROR');
  }

  res.send(users);
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

  return schema.validate(user);
};
