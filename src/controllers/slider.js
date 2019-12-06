const Images = require('../models/images');
const responses = require('../responses');
const Slider = require('../models/slider');
const Encode = require('../middleware/encode');
const Upload = require('../middleware/upload');
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
      const getDetail = await Slider.findOne({ code: req.params.code })
        .populate({
          path: 'imageId',
          select: 'imageFile images',
        })
        .select({ imageId: 1 });

      res.contentType(getDetail.imageId.imageFile.contentType);
      res.send(getDetail.imageId.imageFile.image);
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
          const oldDoc = await Slider.findById(req.params.id);
          if (oldDoc.imageId) await Images.findByIdAndDelete({ _id: oldDoc.imageId });

          // encode image before save to database
          const imageDetail = Encode.encode(req.file);
          req.body.imageFile = imageDetail;

          // save image to Collection images
          const imageModels = new Images(req.body);
          const saveImage = await imageModels.save();

          // update new data
          const update = await Slider.updateOne(
            { _id: req.params.id },
            { $set: { imageId: `${saveImage.id}`, ...req.body } },
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
      const oldDoc = await Slider.findById(req.params.id);
      if (oldDoc.imageId) await Images.findByIdAndDelete({ _id: oldDoc.imageId });

      // remove data
      const remove = await Slider.findByIdAndDelete({ _id: req.params.id });
      responses.success(remove, res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
};
