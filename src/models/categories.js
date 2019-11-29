const mongoose = require('mongoose');

const categories = mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  subCategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subCategories',
  }],
}, { timestamp: true });

module.exports = mongoose.model('categories', categories);
