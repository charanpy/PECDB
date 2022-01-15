const AppError = require('../lib/AppError');
const catchAsync = require('../lib/catchAsync');
const Teacher = require('../models/Teacher');

exports.createTeacher = catchAsync(async (req, res) => {
  const {
    name,
    email,
    password,
    mobileNumber,
    gender,
    dob,
    role,
    photo,
    address,
  } = req.body;

  const teacher = await Teacher.create({
    name,
    email,
    password,
    mobileNumber,
    gender,
    dob,
    role,
    photo,
    address,
  });

  return res.status(201).json({
    status: 'success',
    teacher,
  });
});
