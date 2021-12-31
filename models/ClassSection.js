const mongoose = require('mongoose');

const ClassSectionSchema = new mongoose.Schema(
  {
    classSection: {
      type: String,
      required: [true, 'Class is required'],
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

ClassSectionSchema.index({ classSection: 1, department: 1 }, { unique: true });

const ClassSection = mongoose.model('ClassSection', ClassSectionSchema);

module.exports = ClassSection;
