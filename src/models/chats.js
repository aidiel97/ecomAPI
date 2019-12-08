const mongoose = require('mongoose');

const chats = mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  Sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chats',
    required: true,
  },
  message: {
    type: String,
    required: [true, 'please make sure that message is exist'],
  },
  read: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('chats', chats);
