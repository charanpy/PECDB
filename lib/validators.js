const { check, validationResult } = require('express-validator');
const AppError = require('./AppError');

const validators = {
  deptCodeValidator: check('code', 'Department code is required')
    .not()
    .isEmpty(),
  deptNameValidator: check('deptName', 'Department name is required')
    .not()
    .isEmpty(),
  deleteDeptValidator: check('departmentId', 'Department Id is required')
    .not()
    .isEmpty(),
};

const errorFormatter = ({ msg, param }) => {
  return `${param}: ${msg}`;
};

const isValid = (req, _, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);

  console.log(errors);

  if (!errors.isEmpty()) {
    throw new AppError(errors.array()[0], 400);
  }

  return next();
};

module.exports = {
  validators,
  isValid,
};
