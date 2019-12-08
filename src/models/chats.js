const mongoose = require('mongoose');

const chats = mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  detail: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chatDetails',
  }],
}, { timestamps: true });

module.exports = mongoose.model('chats', chats);
