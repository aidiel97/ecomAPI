const mongoose = require('mongoose');
const moment = require('moment');

const now = moment();

const images = mongoose.Schema({
  Iname: {
    type: String,
    default: now.toString(),
  },
  imageFile: {
    contentType: {
      type: String,
      required: true,
    },
    image: {
      type: Buffer,
      required: true,
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('images', images);
