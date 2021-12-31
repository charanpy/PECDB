const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: [true, 'Roll no is required'],
    unique: [true, 'Rollno already exist'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false,
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'student', 'teacher'],
      message: '{VALUE} is not supported',
    },
    required: [true, 'User role is required'],
    trim: true,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
