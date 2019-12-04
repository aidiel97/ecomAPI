const controllers = require('../controllers/products');

module.exports = (app) => {
  app.route('/products')
    .post(controllers.create);

  app.route('/products/:id')
    .get(controllers.detail);

  app.route('/all-products')
    .get(controllers.all);

  app.route('/catalogs')
    .get(controllers.catalogs);

  app.route('/catalogs/:count')
    .get(controllers.fewCatalogs);

  app.route('/newest')
    .get(controllers.newest);

  app.route('/newest/:count')
    .get(controllers.newestFew);

  app.route('/products/find/:name')
    .get(controllers.find);

  app.route('/all-products/:count')
    .get(controllers.few);

  app.route('/products/:id')
    .put(controllers.update);

  app.route('/products/:id')
    .delete(controllers.delete);
};
