const mongoose = require('mongoose');

const companyProfiles = mongoose.Schema({
  address: String,
  phone: String,
  fax: String,
  email: String,
  website: String,
}, { timestamps: true });

module.exports = mongoose.model('companyProfiles', companyProfiles);
