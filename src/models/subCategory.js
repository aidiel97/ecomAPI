const mongoose = require('mongoose');

const subCategories = mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  categoriesCode: String,
}, { timestamp: true });

module.exports = mongoose.model('subCategories', subCategories);
