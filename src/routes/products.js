const controllers = require('../controllers/products');
const Upload = require('../middleware/upload');

module.exports = (app) => {
  app.route('/products')
    .post(Upload, controllers.create);

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
    .put(Upload, controllers.update);

  app.route('/products/:id')
    .delete(controllers.delete);
};
