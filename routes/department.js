const express = require('express');
const router = express.Router();

const {
  getDepartments,
  createDepartment,
  deleteDepartment,
} = require('../controllers/department');
const { isValid, validators } = require('../lib/validators');

router.route('/').get(getDepartments).post(
  validators.deptNameValidator,
  validators.deptCodeValidator,
  // Check if any error in user data
  isValid,
  createDepartment
);

router
  .route('/:departmentId')
  .delete(validators.deleteDeptValidator, isValid, deleteDepartment);

module.exports = router;
