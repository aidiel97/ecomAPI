const mongoose = require('mongoose');

const faqs = mongoose.Schema({
  pertanyaan: {
    type: String,
    minlength: 3,
    trim: true,
    required: [true, 'PERTANYAAN required'],
    unique: true,
  },
  body: {
    type: String,
    trim: true,
    required: true,
  },
  categories: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('faqs', faqs);
