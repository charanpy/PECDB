const express = require('express');
const {
  getSubject,
  createSubject,
  editSubject,
  deleteSubject,
} = require('../controllers/subject');

const router = express.Router();

const { isValid, validators } = require('../lib/validators');

router
  .route('/')
  .get(getSubject)
  .post(validators.createSubjectValidator, isValid, createSubject);

router
  .route('/:subjectId')
  .put(
    validators.createSubjectValidator,
    validators.deleteSubjectValidator,
    isValid,
    editSubject
  )
  .delete(validators.deleteSubjectValidator, isValid, deleteSubject);

module.exports = router;
