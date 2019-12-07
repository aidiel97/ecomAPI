const responses = require('../responses');
const Images = require('../controllers/images');
const Models = require('../models/news');

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
      const getDetailModels = await Models.findById(req.params.id);
      responses.success(getDetailModels, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  allNews: async (req, res) => {
    try {
      const allModels = await Models.find();
      responses.success(allModels, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  fewNews: async (req, res) => {
    const count = parseInt(req.params.count, 10);
    try {
      const allModels = await Models.find().limit(count);
      responses.success(allModels, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  career: async (req, res) => {
    try {
      const allModels = await Models.find({ newsCategory: 'career' })
        .select({
          id: 1,
          title: 1,
          body: 1,
          imageId: 1,
        });

      responses.success(allModels, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  event: async (req, res) => {
    try {
      const allModels = await Models.find({ newsCategory: 'event' })
        .select({
          id: 1,
          title: 1,
          body: 1,
          imageId: 1,
        });

      responses.success(allModels, res);
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
