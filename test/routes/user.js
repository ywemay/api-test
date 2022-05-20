const express = require('express');
const router = new express.Router();
const getAuthData = require('../auth-data');

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