const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { ObjectId } = mongoose.Schema.Types;
const StudentSchema = new mongoose.Schema(
  {
    department: {
      type: ObjectId,
      ref: 'Department',
    },
    classSection: {
      type: ObjectId,
      ref: 'ClassSection',
    },
    grade: { type: String },
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'First Name is required'],
      trim: true,
    },
    dob: {
      type: String,
      required: [true, 'DOB is required'],
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      lowercase: true,
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: [true, 'Mobile Number is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
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
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

StudentSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  console.log(this.password);
  next();
});

//~Compare Password
StudentSchema.methods.comparePassword = async function (
  dbPassword,
  userPassword
) {
  return await bcrypt.compare(dbPassword, userPassword);
};

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
