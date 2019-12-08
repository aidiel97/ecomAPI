const mongoose = require('mongoose');

const chatDetails = mongoose.Schema({
  sender: {
    type: String,
    enum: ['admin', 'user'],
    required: true,
  },
  message: {
    type: String,
    required: [true, 'MESSAGE required'],
  },
  read: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('chatDetails', chatDetails);
