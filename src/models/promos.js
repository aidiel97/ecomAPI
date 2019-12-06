const mongoose = require('mongoose');

const promos = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  link: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('promos', promos);
