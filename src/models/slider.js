const mongoose = require('mongoose');

const sliders = mongoose.Schema({
  code: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
  },
}, { timestamps: true });

module.exports = mongoose.model('sliders', sliders);
