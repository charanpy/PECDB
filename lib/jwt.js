const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const generateToken = async (payload, secret, expiresIn) => {
  return await promisify(jwt.sign)(payload, secret, {
    expiresIn,
  });
};

const verifyToken = async (token, secret) => {
  return await promisify(jwt.verify)(token, secret);
};

module.exports = {
  generateToken,
  verifyToken,
};
