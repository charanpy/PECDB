const AppError = require('../lib/AppError');
const catchAsync = require('../lib/catchAsync');
const ClassSection = require('../models/ClassSection');

exports.createClass = catchAsync(async (req, res) => {
  const { class: grade, section, department } = req.body;
  const classes = await ClassSection.create({
    class: grade,
    section,
    department,
  });

  return res.status(201).json({
    status: 'success',
    classes,
  });
});

exports.getClass = catchAsync(async (req, res) => {
  // populate('reference field(foreign key)','selected field')
  const classes = await ClassSection.find().populate(
    'department',
    '_id deptName'
  );

  return res.status(200).json({
    status: 'success',
    classes,
  });
});

exports.deleteClass = catchAsync(async (req, res) => {
  const grade = await ClassSection.deleteOne({ _id: req.params.classId });
  if (!grade.deletedCount) throw new AppError('Unable to delete', 400);

  return res.status(200).json({
    status: 'success',
  });
});

exports.getDepartmentClass = catchAsync(async (req, res) => {
  const { departmentId } = req.params;

  const classes = await ClassSection.find({ department: departmentId });

  return res.status(200).json({
    status: 'success',
    classes,
  });
});
