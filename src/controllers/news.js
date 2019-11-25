const responses = require('../responses');
const News = require('../models/news');

module.exports = {
  create: async (req, res) => {
    const news = new News(req.body);

    try {
      const insert = await news.save();
      responses.success(insert, res);
    } catch (err) {
      res.status(401).json({ error: err });
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
      const update = await News.updateOne(
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
      const remove = await News.findByIdAndDelete({ _id: req.params.id });
      responses.success(remove, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
};
