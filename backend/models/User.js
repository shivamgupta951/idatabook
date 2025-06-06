const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String, // Hashed password
    required: true
  },
  rawPassword: {
    type: String // ⚠️ Plain text password (for testing only)
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
