const responses = require('../responses');
const Images = require('../models/images');
const Models = require('../models/products');
const Brands = require('../models/brands');
const Encode = require('../middleware/encode');
const Upload = require('../middleware/upload');
// const Delete = require('../middleware/delete');

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

          const models = new Models(req.body);
          const insert = await models.save();

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
            { $set: { imageId: `${saveImage.id}`, ...req.body } },
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

      const remove = await Models.findByIdAndDelete({ _id: req.params.id });
      responses.success(remove, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
};
