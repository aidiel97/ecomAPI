const Auth = require('../middleware/auth');
const controllers = require('../controllers/transactions');

module.exports = (app) => {
  app.route('/transactions')
    .post(Auth, controllers.create);

  app.route('/transactions/:id')
    .get(Auth, controllers.detail);

  app.route('/user/transactions/:id')
    .get(Auth, controllers.userTransactions);

  app.route('/user/bills/:id')
    .get(Auth, controllers.userBills);

  app.route('/all-transactions')
    .get(Auth, controllers.all);

  app.route('/all-transactions/:count')
    .get(Auth, controllers.few);

  app.route('/transactions/:id')
    .put(Auth, controllers.update);

  app.route('/transactions/:id')
    .delete(Auth, controllers.delete);
};
