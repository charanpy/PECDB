const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../lib/AppError');
const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const catchAsync = require('../lib/catchAsync');

const Users = {
  student: Student,
  teacher: Teacher,
  user: User,
};

const generateToken = async (payload, secret, expiresIn) => {
  return await promisify(jwt.sign)(payload, secret, {
    expiresIn,
  });
};

exports.createUser = catchAsync(async (req, res, next) => {
  const { provider, password, role } = req.body;
  const isUser = await User.findOne({ provider });

  if (isUser) return next(new AppError('User already exists', 400));

  const user = await User.create({ provider, password, role });

  return res.status(201).json({
    status: 'success',
    user,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { provider, password } = req.body;
  const user = await User.findOne({ provider }).select('provider password');

  if (!user) return next(new AppError('Invalid credentials', 401));

  if (!(await user.comparePassword(password, user.password)))
    return next(new AppError('Invalid credentials', 401));

  const token = await generateToken(
    { userId: user._id, role: user.role, provider: user.provider },
    process.env.JWT_SECRET,
    process.env.EXPIRES_IN
  );

  return res.status(200).json({
    token,
    user,
  });
});

exports.protect = (role = 'user') => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return next(new AppError('Please login', 401));
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    if (!decoded || !decoded?.userId) {
      return next(new AppError('Please login', 401));
    }

    console.log(role, Users[role], decoded);
    const user = await Users[role].findById(decoded?.userId);

    if (!user) return next(new AppError('Please login', 401));
    req.user = user;
    next();
  });
};
exports.getMe = catchAsync(async (req, res) => {
  return res.status(200).json({
    user: req.user,
  });
});

const roles = ['teacher', 'admin', 'student'];
exports.restrictTo = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError('You are not allowed to perform this action', 401)
      );
    next();
  };
};
