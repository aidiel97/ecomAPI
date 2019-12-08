const mongoose = require('mongoose');

const news = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'News title required'],
    sparse: true,
  },
  body: {
    type: String,
    required: [true, 'News Body required'],
  },
  newsCategory: {
    type: String,
    enum: ['event', 'career'],
    required: [true, 'News Category required'],
    default: 'event',
  },
  author: {
    type: String,
    required: [true, 'Author required'],
    default: 'admin',
  },
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
  },
}, { timestamps: true });

module.exports = mongoose.model('news', news);
