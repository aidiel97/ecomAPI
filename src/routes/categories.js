const controllers = require('../controllers/categories');
const Auth = require('../middleware/auth');
// const Cache = require('../middleware/cache');

module.exports = (app) => {
  app.route('/categories')
    .post(Auth, controllers.create);

  app.route('/subcategories/:id')
    .post(controllers.createSub);

  app.route('/categories/:id')
    .get(controllers.detail);

  app.route('/all-categories')
    .get(controllers.all);

  app.route('/all-categories/:count')
    .get(controllers.few);

  app.route('/categories/:id')
    .put(Auth, controllers.update);

  app.route('/categories/:id')
    .delete(Auth, controllers.delete);
};
