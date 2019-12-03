const mongoose = require('mongoose');

const brands = mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('brands', brands);
