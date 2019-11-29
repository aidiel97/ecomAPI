const mongoose = require('mongoose');

const banks = mongoose.Schema({
  noAcc: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  bank: {
    type: String,
    required: true,
  },
}, { timestamp: true });

module.exports = mongoose.model('banks', banks);
