const mongoose = require('mongoose');

const contactUs = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
}, { timestamp: true });

module.exports = mongoose.model('contactUs', contactUs);
