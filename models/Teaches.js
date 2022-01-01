const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const TeachesSchema = new mongoose.Schema({
  teacher: {
    type: ObjectId,
    ref: 'Teacher',
  },
  classSection: {
    type: ObjectId,
    ref: 'ClassSection',
  },
  subject: {
    type: ObjectId,
    ref: 'Subject',
  },
});

TeacherSchema.index(
  { teacher: 1, classSection: 1, subject: 1 },
  { unique: true }
);

const Teaches = mongoose.model('Teaches', TeachesSchema);

module.exports = Teaches;
