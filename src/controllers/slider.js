const responses = require('../responses');
const Slider = require('../models/slider');
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
          const slider = new Slider(data);
          const insert = await slider.save();
          responses.success(insert, res);
        } else {
          const slider = new Slider(data);
          const insert = await slider.save();
          responses.success({ file: 'NO UPLOADED FILE', succeess: insert }, res);
        }
      });
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  detail: async (req, res) => {
    try {
      const getDetail = await Slider.findById(req.params.id);
      responses.success(getDetail, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  detailByCode: async (req, res) => {
    try {
      const getDetail = await Slider.findOne({ code: req.params.code }).select({ imageUrl: 1 });
      responses.success(getDetail, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  all: async (req, res) => {
    try {
      const all = await Slider.find();
      responses.success(all, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
  few: async (req, res) => {
    const count = parseInt(req.params.count, 10);
    try {
      const all = await Slider.find().limit(count);
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
          const oldDoc = await Slider.findById(req.params.id).select({ imageUrl: 1 });
          Delete.deleteFile(`public${oldDoc}`);

          // update new data
          const update = await Slider.updateOne(
            { _id: req.params.id },
            { $set: { imageUrl: `/images/${req.file.filename}`, ...req.body } },
          );

          const get = await Slider.findById(req.params.id);
          responses.success({ updated: update, detail: get }, res);
        } else {
          const update = await Slider.updateOne(
            { _id: req.params.id },
            { $set: req.body },
          );

          const get = await Slider.findById(req.params.id);
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
      const oldDoc = await Slider.findById(req.params.id).select({ imageUrl: 1 });
      Delete.deleteFile(`public${oldDoc}`);

      // remove data
      const remove = await Slider.findByIdAndDelete({ _id: req.params.id });
      responses.success(remove, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
};
