const mongoose = require('mongoose');

const promos = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // id_product: {
  //   type: String,
  //   required: true,
  // },
  discount: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('promos', promos);
