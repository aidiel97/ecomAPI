const mongoose = require('mongoose');

const faqs = mongoose.Schema({
  pertanyaan: {
    type: String,
    required: true,
    unique: true,
  },
  body: {
    type: String,
    required: true,
  },
  categories: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('faqs', faqs);
