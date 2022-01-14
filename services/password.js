'use strict'

const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = (plainPassword) => {
    return bcrypt.hash(plainPassword, saltRounds);
}

const verifyPassword = (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash)
}


module.exports = {
    hash: hashPassword,
    verify: verifyPassword,
};
