const Department = require('../models/Department');
const catchAsync = require('../lib/catchAsync');

exports.getDepartments = catchAsync(async (_, res) => {
  const departments = await Department.find();

  return res.status(200).json({
    status: 'success',
    departments,
  });
});

exports.createDepartment = catchAsync(async (req, res) => {
  const { deptName, code } = req.body;

  const department = await Department.create({ deptName, code });

  return res.status(201).json({
    status: 'success',
    department,
  });
});

exports.deleteDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;

  await Department.findByIdAndDelete(departmentId);

  return res.status(200).json({
    status: 'success',
  });
});

exports.editDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const { deptName, code } = req.body;

  const department = await Department.findByIdAndUpdate(
    departmentId,
    {
      deptName,
      code,
    },
    { runValidators: true }
  );

  return res.status(200).json({
    status: 'success',
    department,
  });
});
