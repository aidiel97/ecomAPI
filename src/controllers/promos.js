const responses = require('../responses');
const Products = require('../models/products');
const Images = require('../controllers/images');
const Models = require('../models/promos');

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
  promoProduct: async (req, res) => {
    try {
      const products = await Products.find()
        .populate({
          path: 'promo',
          select: 'discount promos',
        })
        .select({
          name: 1, price: 1, promo: 1, imageUrl: 1, imageId: 1,
        })
        .where('promo')
        .ne(null)
        .lean();

      products.forEach((prod) => {
        prod.price1 = prod.price - prod.price * prod.promo.discount;
      });

      responses.success(products, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  fewPromoProduct: async (req, res) => {
    const count = parseInt(req.params.count, 10);
    try {
      const products = await Products.find()
        .populate({
          path: 'promo',
          select: 'discount promos',
        })
        .select({
          name: 1, price: 1, promo: 1, imageUrl: 1, imageId: 1,
        })
        .where('promo')
        .ne(null)
        .limit(count)
        .lean();

      products.forEach((prod) => {
        prod.price1 = prod.price - prod.price * prod.promo.discount;
      });

      responses.success(products, res);
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
  modals: async (req, res) => {
    try {
      const allModels = await Models.find()
        .select({
          name: 1, imageId: 1,
        })
        .limit(1)
        .sort({ createdAt: -1 });
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
