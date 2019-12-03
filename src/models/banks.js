const mongoose = require('mongoose');

const banks = mongoose.Schema({
  noAcc: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  bank: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('banks', banks);
