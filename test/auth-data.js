const jwt = require('jsonwebtoken');

const { JWT_KEY } = process.env;
const TOKEN_OPTIONS = {
  expiresIn: '1h'
}

module.exports = (user) => {
  const { _id, roles } = user;
  const payload = { uid: _id, roles }
  return {
    token: jwt.sign(payload, JWT_KEY, TOKEN_OPTIONS),
    user
  };
}