const controllers = require('../controllers/promos');
const Upload = require('../middleware/upload');

module.exports = (app) => {
  app.route('/promos')
    .post(Upload, controllers.create);

  app.route('/promos/:id')
    .get(controllers.detail);

  app.route('/product-promo')
    .get(controllers.promoProduct);

  app.route('/product-promo/:count')
    .get(controllers.fewPromoProduct);

  app.route('/all-promos')
    .get(controllers.all);

  app.route('/modals')
    .get(controllers.modals);

  app.route('/all-promos/:count')
    .get(controllers.few);

  app.route('/promos/:id')
    .put(Upload, controllers.update);

  app.route('/promos/:id')
    .delete(controllers.delete);
};
