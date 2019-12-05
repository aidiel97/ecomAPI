const mongoose = require('mongoose');

const flash = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  launch: {
    type: Date,
    required: true,
  },
  expired: {
    type: Date,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
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
