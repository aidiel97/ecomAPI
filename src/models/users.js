require('mongoose-type-email');
const mongoose = require('mongoose');

const users = mongoose.Schema({
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
  },
}, { timestamps: true });

module.exports = mongoose.model('users', users);
