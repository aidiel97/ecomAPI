const mongoose = require('mongoose');

const contactUs = mongoose.Schema({
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  phone: {
    type: String,
    minlength: 10,
    maxlengt: 14,
    trim: true,
    required: [true, 'phone number required'],
  },
  message: {
    type: String,
    trim: true,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('contactUs', contactUs);
