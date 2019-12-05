const bcrypt = require('bcrypt');

const responses = require('../responses');
const Images = require('../models/images');
const User = require('../models/users');
const jwt = require('../utils');
const Upload = require('../middleware/upload');
const Encode = require('../middleware/encode');

module.exports = {
  register: async (req, res) => {
    try {
      const uploadProcess = Upload.save;

      uploadProcess(req, res, async (err) => {
        const data = req.body;
        data.password = bcrypt.hashSync(data.password, 10);

        if (err) {
          res.status(500).json({ status: 'error', message: String(err) });
        } else if (req.file) {
          const imageDetail = Encode.encode(req.file);
          req.body.imageFile = imageDetail;

          // save image to Collection images
          const imageModels = new Images(req.body);
          const saveImage = await imageModels.save();
          data.imageId = saveImage.id;

          const user = new User(data);
          const insert = await user.save();
          responses.success(insert, res);
        } else {
          const user = new User(data);
          const insert = await user.save();
          responses.success({ file: 'NO UPLOADED FILE', succeess: insert }, res);
        }
      });
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  login: async (req, res) => {
    const data = req.body;

    try {
      const userLogin = await User.findOne({ email: req.body.email }).exec();
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
      const uploadProcess = Upload.save;

      uploadProcess(req, res, async (err) => {
        if (req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 10);

        if (err) {
          responses.status(500).json({ status: 'error', message: String(err) });
        } else if (req.file) {
          // delete oldImg
          const oldDoc = await User.findById(req.params.id);
          if (oldDoc.imageId) await Images.findByIdAndDelete({ _id: oldDoc.imageId });

          // encode image before save to database
          const imageDetail = Encode.encode(req.file);
          req.body.imageFile = imageDetail;

          // save image to Collection images
          const imageModels = new Images(req.body);
          const saveImage = await imageModels.save();

          // update new data
          const update = await User.updateOne(
            { _id: req.params.id },
            { $set: { imageId: `${saveImage.id}`, ...req.body } },
          );

          const get = await User.findById(req.params.id);
          responses.success({ updated: update, detail: get }, res);
        } else {
          const update = await User.updateOne(
            { _id: req.params.id },
            { $set: req.body },
          );

          const get = await User.findById(req.params.id);
          responses.success({ file: 'NO UPLOADED FILE', updated: update, detail: get }, res);
        }
      });
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  delete: async (req, res) => {
    try {
      // delete oldImg
      const oldDoc = await User.findById(req.params.id);
      if (oldDoc.imageId) await Images.findByIdAndDelete({ _id: oldDoc.imageId });

      // remove data
      const remove = await User.findByIdAndDelete({ _id: req.params.id });
      responses.success(remove, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
};
