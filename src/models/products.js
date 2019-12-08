const mongoose = require('mongoose');
const moment = require('moment');

const year = moment().year(); // get current year

const products = mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    trim: true,
    required: [true, 'Product name required'],
  },
  price: {
    type: Number,
    min: 1,
    required: [true, 'Price required'],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
    required: [true, 'Category Id required'],
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'brands',
    required: [true, 'Brand Id required'],
  },
  weight: {
    type: Number,
    default: 0,
  },
  dimention: {
    type: String,
    trim: true,
    default: '-',
  },
  color: {
    type: String,
    trim: true,
    required: [true, 'Product color required'],
  },
  description: {
    type: String,
    trim: true,
    default: '-',
  },
  stock: {
    type: Number,
    required: [true, 'Stock required'],
  },
  status: {
    type: Boolean,
    default: true,
  },
  productionYear: {
    type: Number,
    min: 1990,
    max: year,
    trim: true,
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
