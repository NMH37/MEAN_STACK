const mongoose = require('mongoose');
const check_valid = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Enter email!'],
    min: 3,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Enter password!'],
    min: 3,
    trim: true
  },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

userSchema.plugin(check_valid);
module.exports = mongoose.model('User', userSchema);
