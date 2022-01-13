const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const TeacherSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true },
  name: { type: String, require: true },
  phoneNumber: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  mobileNumber: { type: String, require: true },
  password: { type: String, require: true },
  isEmailVerified: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  isDefaultPassword: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Teacher", TeacherSchema);
