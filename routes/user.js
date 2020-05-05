const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

var { User } = require('../models');

const jwtSecretKey = 'scoutout-auth';

router.post('/login', async function (req, res, next) {
  const username = req.body['username'];
  const password = req.body['password'];

  const user = await User.findOne({ where: { 'username': username } });

  const token = jwt.sign({ user_id: user.id, username: user.username }, jwtSecretKey);

  bcrypt.compare(password, user.hashed_password, function (err, result) {
    if (result)
      res.status(200).send({ user_id: user.id, token: token });
    else
      res.status(500).send("Wrong credentials");
  });
});

router.post('/verify-token', async function (req, res, next) {
  const token = req.body['token'];

  const user = token ? jwt.verify(token, jwtSecretKey) : {};

  if (user.user_id) {
    res.status(200).send({ user_id: user.user_id });
  } else {
    res.status(500);
  }
});

router.post('/register', function (req, res, next) {
  const email = req.body['email'];
  const username = email;
  const firstname = req.body['firstname'];
  const lastname = req.body['lastname'];
  const password = req.body['password'];

  bcrypt.hash(password, saltRounds, async function (err, hashed_password) {
    const user = await User.create({
      email: email,
      username: username,
      firstname: firstname,
      lastname: lastname,
      hashed_password: hashed_password
    });

    res.status(200).send({
      email: user.email,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
    });
  });
});

module.exports = router;