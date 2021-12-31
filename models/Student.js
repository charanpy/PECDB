const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
const StudentSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
    },
    department: {
      type: ObjectId,
      ref: 'Department',
    },
    classSection: {
      type: ObjectId,
      ref: 'ClassSection',
    },
    rollNo: {
      type: String,
      trim: true,
    },
    regNo: {
      type: String,
      trim: true,
    },
    semester: {
      type: Number,
      max: 8,
      min: 1,
      // required: [true, 'Semester is required'],
    },
    year: {
      type: Number,
      min: 1,
      max: 4,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
