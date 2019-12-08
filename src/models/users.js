require('mongoose-type-email');
const mongoose = require('mongoose');

const users = mongoose.Schema({
  email: {
    type: mongoose.SchemaTypes.Email,
    required: [true, 'User email required'],
    trim: true,
    lowercase: true,
    unique: true,
  },
  fullname: {
    type: String,
    minlength: 3,
    trim: true,
    required: [true, 'User fullname required'],
  },
  phone: {
    type: String,
    minlength: 10,
    maxlengt: 14,
    trim: true,
    required: [true, 'User phone number required'],
  },
  address: {
    type: String,
    minlength: 5,
    trim: true,
    required: [true, 'User address required'],
  },
  password: {
    type: String,
    trim: true,
    minlength: 6,
    required: [true, 'User password required'],
  },
  role: {
    type: String,
    trim: true,
    enum: ['admin', 'user', 'seller'],
    default: 'user',
    required: [true, 'User role required'],
  },
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
    default: '5dec7a211028220e840c3648', // default user image
  },
}, { timestamps: true });

module.exports = mongoose.model('users', users);
