const mongoose = require('mongoose');

const responses = require('../responses');
const Models = require('../models/flash');
const Images = require('../controllers/images');
const Products = require('../models/products');

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
      const getDataDetail = await Models.findById(req.params.id);
      responses.success(getDataDetail, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  all: async (req, res) => {
    try {
      const allModels = await Models.find();
      responses.success(allModels, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  few: async (req, res) => {
    const count = parseInt(req.params.count, 10);
    try {
      const allModels = await Models.find().limit(count);
      responses.success(allModels, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  flashProduct: async (req, res) => {
    try {
      const products = await Products.find()
        .populate({
          path: 'flash',
          select: 'discount flashs',
        })
        .select({
          name: 1, price: 1, stock: 1, flash: 1, imageUrl: 1, imageId: 1,
        })
        .where('flash')
        .ne(null)
        .lean();

      const data = [];

      products.forEach(async (prod) => {
        data.push({
          _id: mongoose.Types.ObjectId(prod.id),
          name: prod.name,
          price1: prod.price,
          price: prod.price - prod.price * prod.flash.discount,
          imageUrl: prod.imageUrl,
        });
      });
      // const data = await Models.findById('5de73b0d6540f567b55b99ef');

      responses.success(data, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  fewFlashProduct: async (req, res) => {
    const count = parseInt(req.params.count, 10);
    try {
      const products = await Products.find()
        .populate({
          path: 'flash',
          select: 'discount flashs',
        })
        .select({
          name: 1, price: 1, stock: 1, flash: 1, imageUrl: 1, imageId: 1,
        })
        .where('flash')
        .ne(null)
        .limit(count)
        .lean();

      const data = [];

      products.forEach(async (prod) => {
        data.push({
          _id: mongoose.Types.ObjectId(prod.id),
          name: prod.name,
          price1: prod.price,
          price: prod.price - prod.price * prod.flash.discount,
          imageUrl: prod.imageUrl,
        });
      });
      // const data = await Models.findById('5de73b0d6540f567b55b99ef');

      responses.success(data, res);
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
