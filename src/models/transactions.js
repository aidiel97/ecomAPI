const mongoose = require('mongoose');

const transactions = mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'User id required'],
  },
  idProduct: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'User id required'],
  },
  note: {
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
    min: 0,
    required: [true, 'Quantity required'],
  },
  shipping: {
    type: Number,
    default: 10000,
  },
  totalPrice: {
    type: Number,
    required: [true, 'totalPrice required'],
  },
  paidStatus: {
    type: Boolean,
    default: false,
  },
  activedStatus: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('transactions', transactions);
