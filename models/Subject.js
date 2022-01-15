const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Subject name is required'],
      trim: true,
      lowercase: true,
      unique: [true, 'Subject name already exists'],
    },
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
