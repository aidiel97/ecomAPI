const mongoose = require('mongoose');

const flash = mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    trim: true,
    required: [true, 'User fullname required'],
  },
  launch: {
    type: Date,
    required: true,
    default: Date.now,
  },
  expired: {
    type: Date,
    required: true,
  },
  discount: {
    type: Number,
    min: 0,
    max: 1,
    required: [true, 'Flash discount value required'],
  },
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  link: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('flashs', flash);
