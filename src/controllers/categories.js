// const redis = require('redis');

// const client = redis.createClient();

const responses = require('../responses');
const Models = require('../models/categories');

const child = [];
const parent = [];

const removeSub = async (categoryData) => {
  const subCategories = await Models.find({ parentId: categoryData.id }).select('subCategories');

  subCategories.forEach((subCategory) => {
    child.push(subCategory.id);
  });

  await Models.findByIdAndDelete(categoryData.id);

  if (child.length > 0) {
    const categoryId = child[0];
    child.shift(); // remove data[0]
    await removeSub(categoryId);
  }
};

const removeParentSub = async (categoryData) => {
  const parentCategories = await Models.find({ id: categoryData.parentId }).select('parentId');

  parentCategories.forEach((parentCategory) => {
    parent.push(parentCategory.id);
  });

  await Models.findByIdAndUpdate(categoryData.parentId, {
    $pull: { subCategories: categoryData.id },
  });

  if (parent.length > 0) {
    const categoryId = parent[0];
    parent.shift(); // remove data[0]
    await removeParentSub(categoryId);
  }
};

module.exports = {
  create: async (req, res) => {
    const models = new Models(req.body);

    try {
      const insert = await models.save();
      responses.success(insert, res);
    } catch (err) {
      res.status(401).json({ error: err });
    }
  },
  createSub: async (req, res) => {
    const categoryParent = await Models.findById(req.params.id);

    if (!categoryParent) responses.error(`Can't find parent`, res);

    req.body.parentId = categoryParent;

    try {
      const subCategories = new Models(req.body);
      const insert = await subCategories.save();
      categoryParent.subCategories.push({ _id: insert.id }); // push id to parent
      await categoryParent.save();

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
      const allModels = await Models.find({ parentId: null })
        .populate({
          path: 'subCategories',
          select: 'name subCategories',
          populate: { path: 'subCategories', select: 'name subCategories' },
        });

      // set cache data
      // const data = await allModels.json();
      // client.set('category', 1800, JSON.stringify(allModels));

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
    const category = await Models.findById(req.params.id);

    if (!category) responses.error(`Category does'nt exist!`, res);

    try {
      await removeSub(category);// delete child by find parentId that related to this category
      await removeParentSub(category);// delete subCat in parent that related

      responses.success('Delete Success!', res);
    } catch (err) {
      responses.error(String(err), res);
    }
  },
};
