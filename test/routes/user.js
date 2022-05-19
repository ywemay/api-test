const express = require('express');
const router = new express.Router();
const jwt = require('jsonwebtoken');

const { JWT_KEY } = process.env;
const TOKEN_OPTIONS = {
  expiresIn: '1h'
}

function getAuthData(user) {
  const { _id, roles, username, language } = user;
  const payload = { uid: _id, roles }
  return {
    token: jwt.sign(payload, JWT_KEY, TOKEN_OPTIONS),
    user
  };
}

const mockLogIn = (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    const data = {
      username, password,
      roles: ['admin'],
      language: 'en'
    }
    res.status(200).send(getAuthData(data));
  }
  else res.status(404).send();
}

router.post('/login', mockLogIn);

module.exports = router;