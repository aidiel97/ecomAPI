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
}, { timestamp: true });

module.exports = mongoose.model('images', images);
