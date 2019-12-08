const mongoose = require('mongoose');

const banks = mongoose.Schema({
  noAcc: {
    type: String,
    minlengt: 8,
    trim: true,
    required: [true, 'account number required'],
  },
  name: {
    type: String,
    trim: true,
    minlengt: 3,
    required: true,
  },
  bank: {
    type: String,
    trim: true,
    minlengt: 3,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('banks', banks);
