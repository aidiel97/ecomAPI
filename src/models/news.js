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
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
  },
}, { timestamps: true });

module.exports = mongoose.model('news', news);
