const mongoose = require('mongoose');

const brands = mongoose.Schema({
  code: {
    type: String,
    required: [true, 'brands code required'],
    unique: true,
  },
  name: {
    type: String,
    trim: true,
    required: [true, 'brand name required'],
  },
}, { timestamps: true });

module.exports = mongoose.model('brands', brands);
