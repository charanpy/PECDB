const express = require('express');
const router = express.Router();

const {
  getDepartments,
  createDepartment,
  deleteDepartment,
  editDepartment,
} = require('../controllers/department');

const {
  validators,
  createDepartmentValidator,
  updateDepartmentValidator,
} = require('../lib/validators');

router
  .route('/')
  .get(getDepartments)
  .post(createDepartmentValidator, createDepartment);

router
  .route('/:departmentId')
  .delete(validators.deleteDeptValidator, deleteDepartment)
  .put(updateDepartmentValidator, editDepartment);

module.exports = router;
