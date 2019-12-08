const mongoose = require('mongoose');

const chatDetails = mongoose.Schema({
  idChat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chats',
    required: true,
  },
  idSender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chats',
    required: true,
  },
  message: {
    type: String,
    required: [ true, 'please make sure that message is exist'],
  },
  read: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('chatDetails', chatDetails);
