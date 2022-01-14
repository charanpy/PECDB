const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      required: [true, 'Roll no is required'],
      unique: [true, 'Roll no already exist'],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'student', 'teacher'],
        message: '{VALUE} is not supported',
      },
      required: [true, 'User role is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

//~Compare Password
UserSchema.methods.comparePassword = async function (dbPassword, userPassword) {
  return await bcrypt.compare(dbPassword, userPassword);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
