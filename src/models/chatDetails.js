const mongoose = require('mongoose');

const chatDetails = mongoose.Schema({
  id_admin: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('chatDetails', chatDetails);
