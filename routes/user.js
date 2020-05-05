const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var { User } = require('../models');

router.post('/login', async function (req, res, next) {
  const username = req.body['username'];
  const password = req.body['password'];

  const user = await User.findOne({ where: { 'username': username } });

  const token = jwt.sign({ user_id: user.id, username: user.username }, 'scoutout-auth');

  bcrypt.compare(password, user.hashed_password, function (err, result) {
    if (result)
      res.status(200).send({ user_id: user.id, token: token });
    else
      res.status(500).send("Wrong credentials");
  });
});

router.post('/verify-token', async function (req, res, next) {
  const token = req.body['token'];

  const user = token ? jwt.verify(token, 'scoutout-auth') : {};

  if (user.user_id) {
    res.status(200).send({ user_id: user.user_id });
  } else {
    res.status(500);
  }
});

router.post('/register', async function (req, res, next) {
  console.log(req.body);
  res.status(200).send(req.body)
});

module.exports = router;