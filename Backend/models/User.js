const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    emailOrPhone: { // ← Your emailOrPhone field here
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const phoneRegex = /^[0-9]{10,15}$/; // allows 10–15 digit phone numbers
          return emailRegex.test(value) || phoneRegex.test(value);
        },
        message: 'Must be a valid email or phone number',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
