const bcrypt = require('bcrypt');
const responses = require('../responses');
const User = require('../models/users');
const jwt = require('../utils');

module.exports = {
  register: async (req, res) => {
    const data = req.body;
    data.password = bcrypt.hashSync(data.password, 10);
    const user = new User(data);

    try {
      const insert = await user.save();
      responses.success(insert, res);
    } catch (err) {
      res.status(401).json({ error: err });
    }
  },
  login: async (req, res) => {
    const data = req.body;

    try {
      const userLogin = await User.findOne({ email: 'aidiel@gmail.com' }).exec();
      // membuat antisipasi jika user belum mendaftar (data ga ada)
      if (userLogin !== null) {
        const jwtData = {
          _id: userLogin.id,
          email: userLogin.email,
          fullname: userLogin.fullname,
        };

        // verifikasi password, diperiksa apakah pass input == pass dari database
        if (bcrypt.compareSync(data.password, userLogin.password)) {
          const exp = Math.floor(Date.now() / 1000) + (60 * 60);
          const jwtResult = await jwt.generateToken(jwtData, exp, 'https://example.com');
          // kirim parameter ke util/index.js

          // handle response jika login berhasil
          res.json({
            status: 'success',
            message: 'Authentication Successful',
            token: jwtResult,
            error: null,
          });
        } else {
          responses.error('password doesnt match!', res);
        }
      } else {
        responses.error('Anda belum mendaftar', res);
      }
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  detail: async (req, res) => {
    try {
      const getDetailUser = await User.findById(req.params.id);
      responses.success(getDetailUser, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  allUser: async (req, res) => {
    try {
      const allUser = await User.find();
      responses.success(allUser, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  fewUser: async (req, res) => {
    const count = parseInt(req.params.count, 10);
    try {
      const allUser = await User.find().limit(count);
      responses.success(allUser, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  update: async (req, res) => {
    try {
      const update = await User.updateOne(
        { _id: req.params.id },
        { $set: req.body },
      );
      responses.success(update, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  delete: async (req, res) => {
    try {
      const remove = await User.findByIdAndDelete({ _id: req.params.id });
      responses.success(remove, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
};
