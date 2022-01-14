const { check, validationResult } = require('express-validator');
const AppError = require('./AppError');

const checkNotEmpty = (key, message) =>
  check(key, `${message} is required`).not().isEmpty();

const validators = {
  deptCodeValidator: checkNotEmpty('code', 'Department code'),
  deptNameValidator: checkNotEmpty('deptName', 'Department name'),
  deleteDeptValidator: checkNotEmpty(
    'departmentId',
    'Department Id is required'
  ),
  createClassValidator: checkNotEmpty('class', 'Department '),
  createSectionValidator: checkNotEmpty('section', 'Section'),
  createDeptValidator: checkNotEmpty('department', 'Department'),
  deleteClassValidator: checkNotEmpty('classId', 'Class'),
  departmentClassValidator: checkNotEmpty('departmentId', 'Department'),

  createSubjectValidator: checkNotEmpty('subject', 'Subject'),
  deleteSubjectValidator: checkNotEmpty('subjectId', 'Subject'),
};

const errorFormatter = ({ msg, param }) => {
  return `${param}: ${msg}`;
};

const isValid = (req, _, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);

  console.log(errors);

  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0], 400));
  }

  return next();
};

module.exports = {
  validators,
  isValid,
};
