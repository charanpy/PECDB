const AppError = require('../lib/AppError');
const catchAsync = require('../lib/catchAsync');
const Subject = require('../models/Subject');

exports.createSubject = catchAsync(async (req, res) => {
  const subject = await Subject.create({
    name: req.body.subject,
  });

  return res.status(201).json({
    status: 'success',
    subject,
  });
});

exports.getSubject = catchAsync(async (req, res) => {
  const subjects = await Subject.find();

  return res.status(200).json({
    status: 'success',
    subjects,
  });
});

exports.deleteSubject = catchAsync(async (req, res, next) => {
  const subject = await Subject.deleteOne({ _id: req.params.subjectId });

  if (!subject.deletedCount)
    return next(new AppError('Unable to delete subject', 400));

  return res.status(200).json({
    status: 'success',
  });
});

exports.editSubject = catchAsync(async (req, res) => {
  const subject = await Subject.findByIdAndUpdate(
    req.params.subjectId,
    { name: req.body.subject },
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(200).json({
    status: 'success',
    subject,
  });
});
