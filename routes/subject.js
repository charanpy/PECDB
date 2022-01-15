const express = require('express');
const {
  getSubject,
  createSubject,
  editSubject,
  deleteSubject,
} = require('../controllers/subject');

const router = express.Router();

const { validators, editSubjectValidator } = require('../lib/validators');

router
  .route('/')
  .get(getSubject)
  .post(validators.createSubjectValidator, createSubject);

router
  .route('/:subjectId')
  .put(editSubjectValidator, editSubject)
  .delete(validators.deleteSubjectValidator, deleteSubject);

module.exports = router;
