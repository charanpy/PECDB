const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const { ObjectId } = mongoose.Schema.Types;
const StudentSchema = new mongoose.Schema(
  {
    id: { type: String, default: uuidv4, unique: true },

    user: {
      type: ObjectId,
      ref: "User",
      require: true,
    },
    department: {
      type: ObjectId,
      ref: "Department",
      require: true,
    },
    classSection: {
      type: ObjectId,
      ref: "ClassSection",
      require: true,
    },
    rollNo: {
      type: String,
      trim: true,
      require: true,
    },
    regNo: {
      type: String,
      trim: true,
      require: true,
    },
    semester: {
      type: Number,
      max: 8,
      min: 1,
      require: true,
    },
    year: {
      type: Number,
      min: 1,
      max: 4,
      require: true,
    },
    password: { type: String, require: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String, require: true, default: "Admin" },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
