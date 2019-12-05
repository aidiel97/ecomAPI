const responses = require('../responses');
const Images = require('../models/images');
const News = require('../models/news');
const Upload = require('../middleware/upload');
const Encode = require('../middleware/encode');

module.exports = {
  create: async (req, res) => {
    try {
      const uploadProcess = Upload.save;

      uploadProcess(req, res, async (err) => {
        if (err) {
          res.status(500).json({ status: 'error', message: String(err) });
        } else if (req.file) {
          // encode image before save to database
          const imageDetail = Encode.encode(req.file);
          req.body.imageFile = imageDetail;

          // save image to Collection images
          const imageModels = new Images(req.body);
          const saveImage = await imageModels.save();
          req.body.imageId = saveImage.id;

          // save news record
          const news = new News(req.body);
          const insert = await news.save();

          responses.success(insert, res);
        } else {
          const news = new News(req.body);
          const insert = await news.save();
          responses.success({ file: 'NO UPLOADED FILE', succeess: insert }, res);
        }
      });
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  detail: async (req, res) => {
    try {
      const getDetailNews = await News.findById(req.params.id);
      // responses.success(getDetailNews, res);
      res.contentType(getDetailNews.imageFile.contentType);
      res.send(getDetailNews.imageFile.image);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  allNews: async (req, res) => {
    try {
      const allNews = await News.find();
      responses.success(allNews, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  fewNews: async (req, res) => {
    const count = parseInt(req.params.count, 10);
    try {
      const allNews = await News.find().limit(count);
      responses.success(allNews, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  update: async (req, res) => {
    try {
      const uploadProcess = Upload.save;

      uploadProcess(req, res, async (err) => {
        if (err) {
          responses.status(500).json({ status: 'error', message: String(err) });
        } else if (req.file) {
          // delete oldImg
          const oldDoc = await News.findById(req.params.id);
          if (oldDoc.imageId) await Images.findByIdAndDelete({ _id: oldDoc.imageId });

          // encode image before save to database
          const imageDetail = Encode.encode(req.file);
          req.body.imageFile = imageDetail;

          // save image to Collection images
          const imageModels = new Images(req.body);
          const saveImage = await imageModels.save();

          // update new data
          const update = await News.updateOne(
            { _id: req.params.id },
            { $set: { imageId: `${saveImage.id}`, ...req.body } },
          );

          const get = await News.findById(req.params.id);
          responses.success({ updated: update, detail: get }, res);
        } else {
          const update = await News.updateOne(
            { _id: req.params.id },
            { $set: req.body },
          );

          const get = await News.findById(req.params.id);
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
      const oldDoc = await News.findById(req.params.id);
      if (oldDoc.imageId) await Images.findByIdAndDelete({ _id: oldDoc.imageId });

      // remove data
      const remove = await News.findByIdAndDelete({ _id: req.params.id });
      responses.success(remove, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
};
