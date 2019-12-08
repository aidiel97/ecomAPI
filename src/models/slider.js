const mongoose = require('mongoose');

const sliders = mongoose.Schema({
  code: {
    type: Number,
    required: [true, 'Slider Code required'],
  },
  title: {
    type: String,
    minlength: 5,
    trim: true,
    required: [true, 'Slider title required'],
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Slider description required'],
  },
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'images',
  },
}, { timestamps: true });

module.exports = mongoose.model('sliders', sliders);
