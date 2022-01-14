const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema(
  {
    deptName: {
      type: String,
      required: [true, 'Department name is required'],
      trim: true,
      lowercase: true,
      unique: [true, 'Department name must be unique'],
    },
    code: {
      type: String,
      required: [true, 'Department code is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// DepartmentSchema.index({ deptName: 1, code: 1 }, { unique: true });

const Department = mongoose.model('Department', DepartmentSchema);

module.exports = Department;
