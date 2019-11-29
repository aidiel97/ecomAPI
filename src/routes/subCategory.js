const controllers = require('../controllers/subCategory');

module.exports = (app) => {
  app.route('/sub-category')
    .post(controllers.create);

  app.route('/sub-category/:id')
    .get(controllers.detail);

  app.route('/all-sub-category')
    .get(controllers.all);

  app.route('/all-sub-category/:count')
    .get(controllers.few);

  app.route('/sub-category/:id')
    .put(controllers.update);

  app.route('/sub-category/:id')
    .delete(controllers.delete);
};
