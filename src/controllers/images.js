const responses = require('../responses');
const Models = require('../models/images');
const Encode = require('../middleware/encode');

module.exports = {
  up: async (req) => {
    const imageDetail = Encode.encode(req.file);
    req.body.imageFile = imageDetail;
    req.body.Iname = req.file.originalname;

    // save image to Collection images
    const models = new Models(req.body);
    const saveImage = await models.save();

    return saveImage.id;
  },
  del: async (imageId) => {
    await Models.findByIdAndDelete({ _id: imageId });
  },
  create: async (req, res) => {
    try {
      const img = Encode.encode(req.file);
      req.body.imageFile = img;
      req.body.Iname = req.file.originalname;
      const models = new Models(req.body);
      const insert = await models.save();

      responses.success(insert, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  sendImage: async (req, res) => {
    try {
      const getDetailNews = await Models.findById(req.params.id);

      res.contentType(getDetailNews.imageFile.contentType);
      res.send(getDetailNews.imageFile.image);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  all: async (req, res) => {
    try {
      const all = await Models.find().select({ _id: 1, Iname: 1 });
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
