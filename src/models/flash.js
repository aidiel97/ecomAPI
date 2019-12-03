const mongoose = require('mongoose');

const flash = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // id_product: {
  //   type: String,
  //   required: true,
  // },
  launch: {
    type: Date,
    required: true,
  },
  expired: {
    type: Date,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  link: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('flashs', flash);
