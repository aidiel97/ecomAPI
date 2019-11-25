// modul untuk convert data hasil login menjadi token dalam file terpisah dengan jwt
const jwt = require('jsonwebtoken');

module.exports = {
  // PARAMETER INI MENANDAKAN DATA-DATA YANG AKAN DI BAWA SAAT SELESAI LOGIN
  generateToken: async (data_, exp, iss_ = null) => {
    const sign = jwt.sign({
      iss: iss_,
      expired: exp,
      data: data_,
    }, process.env.SECRET_KEY, { algorithm: process.env.JWT_ALGORITHM });
    return sign;
  },
};
