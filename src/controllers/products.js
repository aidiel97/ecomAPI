const responses = require('../responses');
const Models = require('../models/products');
const Brands = require('../models/brands');
// const Flash = require('../models/flash');
// const Promo = require('../models/promos');
const Upload = require('../middleware/upload');
const Delete = require('../middleware/delete');

module.exports = {
  create: async (req, res) => {
    try {
      const uploadProcess = Upload.save;

      uploadProcess(req, res, async (err) => {
        if (err) {
          res.status(500).json({ status: 'error', message: String(err) });
        } else if (req.file) {
          // make sure flashsale is exist
          // const flashId = await Flash.findById(req.body.flash).select({ id: 1, active: 1 });
          // const promoId = await Promo.findById(req.body.promo).select({ id: 1, active: 1 });

          req.body.imageUrl = `/images/${req.file.filename}`;
          const models = new Models(req.body);
          const insert = await models.save();

          // if (flashId && flashId.active == true) flashId.products.push({ _id: insert.id });
          // push product to flashsale
          // if (promoId && promoId.active == true) flashId.products.push({ _id: insert.id });
          // push product to promo

          responses.success(insert, res);
        } else {
          const models = new Models(req.body);
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
          name: 1, price: 1, stock: 1, imageUrl: 1,
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
          name: 1, price: 1, stock: 1, imageUrl: 1, createdAt: 1,
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
          name: 1, price: 1, stock: 1, imageUrl: 1, createdAt: 1,
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
          name: 1, price: 1, stock: 1, imageUrl: 1,
        });

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
      const uploadProcess = Upload.save;

      uploadProcess(req, res, async (err) => {
        if (err) {
          responses.status(500).json({ status: 'error', message: String(err) });
        } else if (req.file) {
          // delete oldImg
          const oldDoc = await Models.findById(req.params.id).select({ imageUrl: 1 });
          Delete.deleteFile(`public${oldDoc}`);

          // update new data
          const update = await Models.updateOne(
            { _id: req.params.id },
            { $set: { imageUrl: `/images/${req.file.filename}`, ...req.body } },
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
      const oldDoc = await Models.findById(req.params.id).select({ imageUrl: 1 });
      Delete.deleteFile(`public${oldDoc}`);

      // remove data
      const remove = await Models.findByIdAndDelete({ _id: req.params.id });
      responses.success(remove, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
};
