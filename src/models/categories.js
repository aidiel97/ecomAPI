const mongoose = require('mongoose');

const Categories = mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    trim: true,
    required: [true, 'please insert a name'],
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
    default: null,
  },
  subCategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
  }],
}, { timestamps: true });

module.exports = mongoose.model('categories', Categories);
