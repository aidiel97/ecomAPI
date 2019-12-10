const responses = require('../responses');
const Images = require('../controllers/images');
const Models = require('../models/products');
const Brands = require('../models/brands');
// const Delete = require('../middleware/delete');

const SortHandler = (params) => {
  let value = {};
  if (params === 'terbaru') {
    value = { updatedAt: -1 };
  } else if (params === 'terlama') {
    value = { updatedAt: 1 };
  } else if (params === 'termurah') {
    value = { price: 1 };
  } else if (params === 'termahal') {
    value = { price: -1 };
  } else {
    value = {};
  }

  return value;
};

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
      const getDetail = await Models.findById(req.params.id)
        .populate({
          path: 'category',
          select: 'name categories',
        })
        .populate({
          path: 'brand',
          select: 'name brands',
        });

      responses.success(getDetail, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  catalogs: async (req, res) => {
    try {
      const all = await Models.find()
        .select({
          name: 1, price: 1, stock: 1, imageUrl: 1, imageId: 1,
        });

      responses.success(all, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  fewCatalogs: async (req, res) => {
    const count = parseInt(req.params.count, 10);
    try {
      const all = await Models.find()
        .select({
          name: 1, price: 1, stock: 1, imageUrl: 1,
        })
        .limit(count);

      responses.success(all, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  newest: async (req, res) => {
    try {
      const all = await Models.find()
        .select({
          name: 1, price: 1, stock: 1, imageUrl: 1, createdAt: 1, imageId: 1,
        })
        .sort({ createdAt: -1 }); // = 'descending'

      responses.success(all, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  newestFew: async (req, res) => {
    const count = parseInt(req.params.count, 10);
    try {
      const all = await Models.find()
        .select({
          name: 1, price: 1, stock: 1, imageUrl: 1, createdAt: 1, imageId: 1,
        })
        .limit(count)
        .sort({ createdAt: -1 });// = 'descending'

      responses.success(all, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  find: async (req, res) => {
    const parameters = req.params.name;
    try {
      const brandName = await Brands.findOne({ name: { $regex: parameters, $options: 'i' } })
        .select({ id: 1 });

      const all = await Models.find({
        $or: [
          { name: { $regex: parameters, $options: 'i' } },
          { brand: brandName },
        ],
      })
        .select({
          name: 1, price: 1, stock: 1, imageUrl: 1, imageId: 1,
        });

      responses.success(all, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  fastByCategories: async (req, res) => {
    const catId = req.params.categories;
    const count = parseInt(req.params.count, 10);
    const sortby = SortHandler(req.params.sort);
    try {
      const all = await Models.find({ category: catId })
        .select({
          name: 1, price: 1, stock: 1, imageId: 1, updatedAt: 1,
        })
        .sort(sortby)
        .limit(count);

      responses.success(all, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  byCategories: async (req, res) => {
    const catId = req.query.categories;
    const sortby = SortHandler(req.query.sort);
    const count = parseInt(req.query.count, 10);
    try {
      const all = await Models.find({ category: catId })
        .select({
          name: 1, price: 1, stock: 1, imageId: 1, updatedAt: 1,
        })
        .sort(sortby)
        .limit(count);

      responses.success(all, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  all: async (req, res) => {
    try {
      const all = await Models.find()
        .populate({
          path: 'category',
          select: 'name categories',
        })
        .populate({
          path: 'brand',
          select: 'name brands',
        });

      responses.success(all, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  few: async (req, res) => {
    const count = parseInt(req.params.count, 10);
    try {
      const all = await Models.find()
        .populate({
          path: 'category',
          select: 'name categories',
        })
        .populate({
          path: 'brand',
          select: 'name brands',
        }).limit(count);

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

      const remove = await Models.findByIdAndDelete({ _id: req.params.id });
      responses.success(remove, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
};
