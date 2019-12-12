const controllers = require('../controllers/brands');
const Auth = require('../middleware/auth');

module.exports = (app) => {
  app.route('/brands')
    .post(Auth, controllers.create);

  app.route('/brands/:id')
    .get(controllers.detail);

  app.route('/all-brands')
    .get(controllers.all);

  app.route('/all-brands/:count')
    .get(controllers.few);

  app.route('/brands/:id')
    .put(Auth, controllers.update);

  app.route('/brands/:id')
    .delete(Auth, controllers.delete);
};
