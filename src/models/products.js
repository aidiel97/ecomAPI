const mongoose = require('mongoose');

const products = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
    required: true,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'brands',
    required: true,
  },
  weight: {
    type: Number,
    default: 0,
  },
  dimention: {
    type: String,
    default: '-',
  },
  color: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  productionYear: {
    type: Number,
    required: true,
  },
  flash: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'flashs',
    default: null,
  },
  promo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'promos',
    default: null,
  },
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
  },
}, { timestamps: true });

module.exports = mongoose.model('products', products);
