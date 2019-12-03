const mongoose = require('mongoose');

const images = mongoose.Schema({
  contentType: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('images', images);
