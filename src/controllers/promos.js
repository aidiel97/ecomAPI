const mongoose = require('mongoose');

const responses = require('../responses');
const Products = require('../models/products');
const Images = require('../models/images');
const Models = require('../models/promos');
const Upload = require('../middleware/upload');
const Encode = require('../middleware/encode');
// const Delete = require('../middleware/delete');

module.exports = {
  create: async (req, res) => {
    try {
      const uploadProcess = Upload.save;

      uploadProcess(req, res, async (err) => {
        const data = req.body;

        if (err) {
          res.status(500).json({ status: 'error', message: String(err) });
        } else if (req.file) {
          // encode image before save to database
          const imageDetail = Encode.encode(req.file);
          req.body.imageFile = imageDetail;

          // save image to Collection images
          const imageModels = new Images(req.body);
          const saveImage = await imageModels.save();
          data.imageId = saveImage.id;

          const models = new Models(data);
          const insert = await models.save();
          responses.success(insert, res);
        } else {
          const models = new Models(data);
          const insert = await models.save();
          responses.success({ file: 'NO UPLOADED FILE', succeess: insert }, res);
        }
      });
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
  promoProduct: async (req, res) => {
    try {
      const products = await Products.find()
        .populate({
          path: 'promo',
          select: 'discount promos',
        })
        .select({
          name: 1, price: 1, stock: 1, flash: 1, imageUrl: 1, imageId: 1,
        })
        .where('promo')
        .ne(null)
        .lean();

      const data = [];

      products.forEach(async (prod) => {
        data.push({
          _id: mongoose.Types.ObjectId(prod.id),
          name: prod.name,
          price: prod.price,
          PromoSale: prod.price - prod.price * prod.promo.discount,
          imageUrl: prod.imageUrl,
        });
      });
      // const data = await Models.findById('5de73b0d6540f567b55b99ef');

      responses.success(data, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  fewPromoProduct: async (req, res) => {
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
          price: prod.price,
          flashSale: prod.price - prod.price * prod.flash.discount,
          imageUrl: prod.imageUrl,
        });
      });
      // const data = await Models.findById('5de73b0d6540f567b55b99ef');

      responses.success(data, res);
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
  update: async (req, res) => {
    try {
      const uploadProcess = Upload.save;

      uploadProcess(req, res, async (err) => {
        if (err) {
          responses.status(500).json({ status: 'error', message: String(err) });
        } else if (req.file) {
          // delete oldImg
          const oldDoc = await Models.findById(req.params.id);
          if (oldDoc.imageId) await Images.findByIdAndDelete({ _id: oldDoc.imageId });

          // encode image before save to database
          const imageDetail = Encode.encode(req.file);
          req.body.imageFile = imageDetail;

          // save image to Collection images
          const imageModels = new Images(req.body);
          const saveImage = await imageModels.save();

          // update new data
          const update = await Models.updateOne(
            { _id: req.params.id },
            { $set: { imageUrl: `${saveImage.id}`, ...req.body } },
          );

          const get = await Models.findById(req.params.id);
          responses.success({ updated: update, detail: get }, res);
        } else {
          const update = await Models.updateOne(
            { _id: req.params.id },
            { $set: req.body },
          );

          const get = await Models.findById(req.params.id);
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
      const oldDoc = await Models.findById(req.params.id);
      if (oldDoc.imageId) await Images.findByIdAndDelete({ _id: oldDoc.imageId });

      // remove data
      const remove = await Models.findByIdAndDelete({ _id: req.params.id });
      responses.success(remove, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
};
