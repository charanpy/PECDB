const express = require('express');
const {
  createClass,
  getClass,
  deleteClass,
  getDepartmentClass,
} = require('../controllers/classSection');
const router = express.Router();

const { isValid, validators } = require('../lib/validators');

router
  .route('/')
  .post(
    validators.createClassValidator,
    validators.createSectionValidator,
    validators.createDeptValidator,
    isValid,
    createClass
  )
  .get(getClass);

router
  .route('/department/:departmentId')
  .get(validators.departmentClassValidator, isValid, getDepartmentClass);

router
  .route('/:classId')
  .delete(validators.deleteClassValidator, isValid, deleteClass);

module.exports = router;
