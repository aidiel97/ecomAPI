const controllers = require('../controllers/brands');

module.exports = (app) => {
  app.route('/brands')
    .post(controllers.create);

  app.route('/brands/:id')
    .get(controllers.detail);

  app.route('/all-brands')
    .get(controllers.all);

  app.route('/all-brands/:count')
    .get(controllers.few);

  app.route('/brands/:id')
    .put(controllers.update);

  app.route('/brands/:id')
    .delete(controllers.delete);
};
