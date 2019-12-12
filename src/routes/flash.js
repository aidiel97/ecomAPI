const Upload = require('../middleware/upload');
const controllers = require('../controllers/flash');
const Auth = require('../middleware/auth');

module.exports = (app) => {
  app.route('/flash')
    .post(Auth, Upload, controllers.create);

  app.route('/flash/:id')
    .get(controllers.detail);

  app.route('/all-flash')
    .get(controllers.all);

  app.route('/product-flash')
    .get(controllers.flashProduct);

  app.route('/product-flash/:count')
    .get(controllers.fewFlashProduct);

  app.route('/all-brands/:count')
    .get(controllers.few);

  app.route('/flash/:id')
    .put(Auth, Upload, controllers.update);

  app.route('/flash/:id')
    .delete(Auth, controllers.delete);
};
