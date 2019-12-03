const controllers = require('../controllers/categories');

module.exports = (app) => {
  app.route('/categories')
    .post(controllers.create);

  app.route('/subcategories/:id')
    .post(controllers.createSub);

  app.route('/categories/:id')
    .get(controllers.detail);

  app.route('/all-categories')
    .get(controllers.all);

  app.route('/all-categories/:count')
    .get(controllers.few);

  app.route('/categories/:id')
    .put(controllers.update);

  app.route('/categories/:id')
    .delete(controllers.delete);
};
