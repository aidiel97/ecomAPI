const mongoose = require('mongoose');

const promos = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Promos name required'],
  },
  discount: {
    type: Number,
    min: 0,
    max: 1,
    required: [true, 'Promos discount value required'],
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
