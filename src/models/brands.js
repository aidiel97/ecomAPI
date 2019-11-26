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
  date: {
    type: Date,
    default: Date.now, // get time
  },
});

module.exports = mongoose.model('brands', brands);
