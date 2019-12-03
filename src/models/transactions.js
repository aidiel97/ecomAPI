const mongoose = require('mongoose');

const transactions = mongoose.Schema({
  id_user: {
    type: String,
    required: true,
  },
  id_product: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  total: {
    type: Number,
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
