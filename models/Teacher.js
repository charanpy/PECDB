const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const TeacherSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
  },
  department: [
    {
      type: ObjectId,
      ref: 'Department',
    },
  ],
  name: {
    type: String,
    trim: true,
    lowercase: true,
  },
});

const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = Teacher;
