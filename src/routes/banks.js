const controllers = require('../controllers/banks');

module.exports = (app) => {
  app.route('/banks')
    .post(controllers.create);

  app.route('/banks/:id')
    .get(controllers.detail);

  app.route('/banks-find/:bank')
    .get(controllers.spesific);

  app.route('/all-banks')
    .get(controllers.all);

  app.route('/all-banks/:count')
    .get(controllers.few);

  app.route('/banks/:id')
    .put(controllers.update);

  app.route('/banks/:id')
    .delete(controllers.delete);
};
