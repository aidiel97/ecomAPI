const Images = require('../controllers/images');
const responses = require('../responses');
const Models = require('../models/slider');

module.exports = {
  create: async (req, res) => {
    try {
      req.body.imageId = await Images.up(req); // call 'up' Function from images

      const models = new Models(req.body);
      const insert = await models.save();

      responses.success(insert, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  detail: async (req, res) => {
    try {
      const getDetail = await Models.findById(req.params.id);
      responses.success(getDetail, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  detailByCode: async (req, res) => {
    try {
      const getDetail = await Models.findOne({ code: req.params.code })
        .populate({
          path: 'imageId',
          select: 'imageFile images',
        })
        .select({ imageId: 1 });

      res.contentType(getDetail.imageId.imageFile.contentType);
      res.send(getDetail.imageId.imageFile.image);
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
  few: async (req, res) => {
    const count = parseInt(req.params.count, 10);
    try {
      const all = await Models.find().limit(count);
      responses.success(all, res);
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
