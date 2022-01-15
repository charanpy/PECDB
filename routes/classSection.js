const express = require('express');
const {
  createClass,
  getClass,
  deleteClass,
  getDepartmentClass,
} = require('../controllers/classSection');
const router = express.Router();

const { validators, createClassValidator } = require('../lib/validators');

router.route('/').post(createClassValidator, createClass).get(getClass);

router
  .route('/department/:departmentId')
  .get(validators.departmentClassValidator, getDepartmentClass);

router.route('/:classId').delete(validators.deleteClassValidator, deleteClass);

module.exports = router;
