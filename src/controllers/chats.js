const responses = require('../responses');
const Models = require('../models/chats');
const Details = require('../models/chatDetails');

module.exports = {
  create: async (req, res) => {
    try {
      const details = new Details(req.body);
      const insert = await details.save();

      const oldChat = await Models.findOne({
        $or: [
          { idUser: req.body.idUser },
          { name: req.body.name },
        ],
      });

      if (oldChat) {
        oldChat.detail.push({ _id: details.id });
        oldChat.save();
      } else {
        const newChat = new Models(req.body);
        newChat.detail.push({ _id: details.id });
        await newChat.save();
      }

      responses.success(insert, res);
    } catch (err) {
      res.status(401).json({ error: err });
    }
  },
  detail: async (req, res) => {
    try {
      const getDataDetail = await Models.findById(req.params.id)
        .populate({
          path: 'detail',
          select: ['message', 'sender', 'read', 'createdAt', 'updatedAt'],
        });
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
