const APIFeatures = require('../lib/ApiFeatures');
const AppError = require('../lib/AppError');
const catchAsync = require('../lib/catchAsync');
const { generateToken, verifyToken } = require('../lib/jwt');
const Student = require('../models/Student');

exports.createStudent = catchAsync(async (req, res, next) => {
  const {
    department,
    classSection,
    grade,
    firstName,
    lastName,
    dob,
    gender,
    mobileNumber,
    email,
    password,
    address,
    rollNo,
    regNo,
    semester,
    year,
    photo,
  } = req.body;

  const filters = {
    $or: [
      {
        regNo,
      },
      {
        rollNo,
      },
    ],
  };

  const isStudent = await Student.findOne(filters);

  if (isStudent)
    return next(
      new AppError('Register Number or Roll Number already exists', 400)
    );

  const student = await Student.create({
    department,
    classSection,
    grade,
    firstName,
    lastName,
    dob,
    gender,
    mobileNumber,
    email,
    password,
    address,
    rollNo,
    regNo,
    semester,
    year,
    photo,
  });

  return res.status(201).json({
    status: 'success',
    student,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { regNo, password } = req.body;
  const student = await Student.findOne({ regNo });

  console.log(student, 2);
  if (!student) return next(new AppError('Invalid credentials', 401));

  if (!(await student.comparePassword(password, student.password)))
    return next(new AppError('Invalid credentials', 401));

  const token = await generateToken(
    { userId: student._id, role: 'student', regNo },
    process.env.JWT_SECRET,
    process.env.EXPIRES_IN
  );

  return res.status(200).json({
    status: 'success',
    token,
    student,
  });
});

exports.deleteStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;

  const student = await Student.deleteOne({ _id: studentId });

  if (!student.deletedCount) return next(new AppError('Unable to delete', 400));

  return res.status(200).json({
    status: 'success',
  });
});

exports.updateStudent = catchAsync(async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(
    req.params.studentId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(200).json({
    status: 'success',
    student,
  });
});

exports.getStudentById = catchAsync(async (req, res) => {
  const student = await Student.findById(req.params.studentId);

  return res.status(200).json({
    status: 'success',
    student,
  });
});

exports.getStudent = catchAsync(async (req, res) => {
  const features = new APIFeatures(Student.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();

  const students = await features.query;

  return res.status(200).json({
    status: 'success',
    students,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return next(new AppError('Please login', 401));
  const decoded = await verifyToken(token, process.env.JWT_SECRET);

  if (!decoded || !decoded?.userId) {
    return next(new AppError('Please login', 401));
  }

  const user = await Student.findById(decoded?.userId);

  if (!user) return next(new AppError('Please login', 401));
  req.user = user;
  next();
});

exports.getMe = catchAsync(async (req, res, next) => {
  return res.status(200).json({
    status: 'success',
    student: req.user,
  });
});
