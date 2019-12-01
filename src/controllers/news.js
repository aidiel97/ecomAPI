const responses = require('../responses');
const News = require('../models/news');
const Upload = require('../middleware/upload');
const Delete = require('../middleware/delete');

module.exports = {
  create: async (req, res) => {
    try {
      const uploadProcess = Upload.save;

      uploadProcess(req, res, async (err) => {
        // const data = req.body;
        if (err) {
          res.status(500).json({ status: 'error', message: String(err) });
        } else if (req.file) {
          req.body.imageUrl = `/images/${req.file.filename}`;
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
      responses.success(getDetailNews, res);
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
          const oldDoc = await News.findById(req.params.id).select({ imageUrl: 1 });
          Delete.deleteFile(`public${oldDoc}`);

          // update new data
          const update = await News.updateOne(
            { _id: req.params.id },
            { $set: { imageUrl: `/images/${req.file.filename}`, ...req.body } },
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
      const oldDoc = await News.findById(req.params.id).select({ imageUrl: 1 });
      Delete.deleteFile(`public${oldDoc}`);

      // remove data
      const remove = await News.findByIdAndDelete({ _id: req.params.id });
      responses.success(remove, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
};
