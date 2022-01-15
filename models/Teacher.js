const mongoose = require('mongoose');

// const { ObjectId } = mongoose.Schema.Types;

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile Number is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  dob: {
    type: String,
    required: [true, 'DOB is required'],
    trim: true,
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    lowercase: true,
  },
  role: {
    type: String,
    default: 'teacher',
    enum: {
      values: ['teacher'],
      message: '{VALUE} role not available',
    },
  },
  photo: {
    type: String,
  },
});

const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = Teacher;
