const responses = require('../responses');
const Models = require('../models/images');
const Upload = require('../middleware/upload');
// const Delete = require('../middleware/delete');
const Encode = require('../middleware/encode');

module.exports = {
  create: async (req, res) => {
    try {
      const uploadProcess = Upload.save;

      uploadProcess(req, res, async (err) => {
        if (err) {
          res.status(500).json({ status: 'error', message: String(err) });
        } else if (req.file) {
          const img = Encode.encode(req.file);
          req.body.imageFile = img;
          const models = new Models(req.body);
          const insert = await models.save();

          responses.success(insert, res);
        } else {
          responses.error(String('NO FILE UPLOADED!'), res);
        }
      });
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  sendImage: async (req, res) => {
    try {
      const getDetailNews = await Models.findById(req.params.id);
      // responses.success(getDetailNews, res);
      res.contentType(getDetailNews.imageFile.contentType);
      res.send(getDetailNews.imageFile.image);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  all: async (req, res) => {
    try {
      const all = await Models.find();
      responses.success(all, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  delete: async (req, res) => {
    try {
      const remove = await Models.findByIdAndDelete({ _id: req.params.id });
      responses.success(remove, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
};
