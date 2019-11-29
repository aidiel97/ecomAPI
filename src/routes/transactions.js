const controllers = require('../controllers/transactions');

module.exports = (app) => {
  app.route('/transactions')
    .post(controllers.create);

  app.route('/transactions/:id')
    .get(controllers.detail);

  app.route('/all-transactions')
    .get(controllers.all);

  app.route('/all-transactions/:count')
    .get(controllers.few);

  app.route('/transactions/:id')
    .put(controllers.update);

  app.route('/transactions/:id')
    .delete(controllers.delete);
};
