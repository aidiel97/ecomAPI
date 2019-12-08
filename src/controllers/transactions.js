const responses = require('../responses');
const Models = require('../models/transactions');
const Product = require('../models/products');

module.exports = {
  create: async (req, res) => {
    const newStock = -req.body.quantity; // get&set quantity of product
    await Product.updateOne(
      { _id: req.body.idProduct },
      { $inc: { stock: newStock } },
    );

    try {
      const productDetail = await Product.findById(req.body.idProduct)
        .select({
          name: 1, price: 1, stock: 1, flash: 1, promo: 1,
        })
        .populate({
          path: 'flash',
          select: 'discount flashs',
        })
        .populate({
          path: 'promo',
          select: 'discount promos',
        })
        .lean();

      const lastPrice = req.body.quantity * productDetail.price;

      // set price
      if (productDetail.promo) {
        req.body.totalPrice = lastPrice * productDetail.promo.discount;
      } else if (productDetail.flash) {
        req.body.totalPrice = lastPrice * productDetail.promo.discount;
      } else {
        req.body.totalPrice = lastPrice;
      }

      const models = new Models(req.body);
      const insert = await models.save();
      responses.success(insert, res);
    } catch (err) {
      res.status(401).json({ error: err });
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
  update: async (req, res) => {
    try {
      const update = await Models.updateOne(
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
      const remove = await Models.findByIdAndDelete({ _id: req.params.id });
      responses.success(remove, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
};
