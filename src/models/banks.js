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
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
  },
}, { timestamps: true });

module.exports = mongoose.model('banks', banks);
