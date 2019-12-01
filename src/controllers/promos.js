const responses = require('../responses');
const Models = require('../models/promos');
const Upload = require('../middleware/upload');
const Delete = require('../middleware/delete');

module.exports = {
  create: async (req, res) => {
    try {
      const uploadProcess = Upload.save;

      uploadProcess(req, res, async (err) => {
        const data = req.body;

        if (err) {
          res.status(500).json({ status: 'error', message: String(err) });
        } else if (req.file) {
          data.imageUrl = `/images/${req.file.filename}`;
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
