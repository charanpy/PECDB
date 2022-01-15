const express = require('express');
const {
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  login,
  protect,
  getMe,
} = require('../controllers/student');

const router = express.Router();

const {
  createStudentValidator,
  deleteStudentValidator,
  studentLoginValidator,
} = require('../lib/validators');

router.route('/').get(getStudent).post(createStudentValidator, createStudent);

router.route('/me').get(protect, getMe);
router.route('/login').post(studentLoginValidator, login);

router
  .route('/:studentId')
  .put(createStudentValidator, updateStudent)
  .delete(deleteStudentValidator, deleteStudent);
module.exports = router;
