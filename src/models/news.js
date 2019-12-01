const mongoose = require('mongoose');

const news = mongoose.Schema({
  title: {
    type: String,
    required: true,
    sparse: true,
  },
  body: {
    type: String,
    required: true,
  },
  newsCategory: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
}, { timestamp: true });

module.exports = mongoose.model('news', news);
