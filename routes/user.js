const express = require('express');
const { createUser, login, protect, getMe } = require('../controllers/user');

const router = express.Router();

const { isValid, validators } = require('../lib/validators');

router
  .route('/')
  .get(protect, getMe)
  .post(
    validators.createProviderValidator,
    validators.createPasswordValidator,
    validators.createRoleValidator,
    isValid,
    createUser
  );

router
  .route('/login')
  .post(
    validators.createProviderValidator,
    validators.createPasswordValidator,
    isValid,
    login
  );

module.exports = router;
