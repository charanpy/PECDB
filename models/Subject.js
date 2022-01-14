const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Subject name is required'],
      trim: true,
      lowercase: true,
    },
    // department: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Department',
    //   },
    // ],
    // semester: {
    //   type: Number,
    //   max: 8,
    //   min: 1,
    //   required: [true, 'Semester is required'],
    // },
    elective: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Subject = mongoose.model('Subject', SubjectSchema);

module.exports = Subject;
