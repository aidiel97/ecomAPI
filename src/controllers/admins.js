const bcrypt = require('bcrypt');

const responses = require('../responses');
const Images = require('../controllers/images');
const Models = require('../models/admins');
const jwt = require('../utils');

module.exports = {
  register: async (req, res) => {
    try {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      req.body.imageId = await Images.up(req); // call 'up' Function from images

      const models = new Models(req.body);
      const insert = await models.save();

      responses.success(insert, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  login: async (req, res) => {
    const data = req.body;

    try {
      const adminLogin = await Models.findOne({ email: req.body.email }).exec();
      // membuat antisipasi jika admin belum mendaftar (data ga ada)
      if (adminLogin !== null) {
        const jwtData = {
          _id: adminLogin.id,
          email: adminLogin.email,
          fullname: adminLogin.fullname,
        };

        // verifikasi password, diperiksa apakah pass input == pass dari database
        if (bcrypt.compareSync(data.password, adminLogin.password)) {
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
      const getDetailadmin = await Models.findById(req.params.id);
      responses.success(getDetailadmin, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  alladmin: async (req, res) => {
    try {
      const alladmin = await Models.find();
      responses.success(alladmin, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  fewadmin: async (req, res) => {
    const count = parseInt(req.params.count, 10);
    try {
      const alladmin = await Models.find().limit(count);
      responses.success(alladmin, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  update: async (req, res) => {
    try {
      // delete oldImg
      const oldImg = await Models.findById(req.params.id).select('imageId');
      if (oldImg.imageId) await Images.del(oldImg.imageId);

      if (req.file) req.body.imageId = await Images.up(req); // call 'up' Function from images

      if (req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 10);

      // update new data
      const update = await Models.updateOne(
        { _id: req.params.id },
        { $set: req.body },
      );

      responses.success({ updated: update, detail: req.body }, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  delete: async (req, res) => {
    try {
      // delete oldImg
      const oldImg = await Models.findById(req.params.id).select('imageId');
      if (oldImg.imageId) await Images.del(oldImg.imageId);

      // remove data
      const remove = await Models.findByIdAndDelete({ _id: req.params.id });
      responses.success(remove, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
};
