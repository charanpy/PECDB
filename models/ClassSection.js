const mongoose = require('mongoose');

const ClassSectionSchema = new mongoose.Schema(
  {
    class: {
      type: String,
      required: [true, 'Class is required'],
      trim: true,
      lowercase: true,
    },
    section: {
      type: String,
      required: [true, 'Section is required'],
      trim: true,
      lowercase: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
    },
  },
  {
    timestamps: true,
  }
);

ClassSectionSchema.index({ department: 1, section: 1 }, { unique: true });

const ClassSection = mongoose.model('ClassSection', ClassSectionSchema);

module.exports = ClassSection;
