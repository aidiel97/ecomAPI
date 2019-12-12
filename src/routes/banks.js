const controllers = require('../controllers/banks');
const Upload = require('../middleware/upload');
const Auth = require('../middleware/auth');

module.exports = (app) => {
  app.route('/banks')
    .post(Auth, Upload, controllers.create);

  app.route('/banks/:id')
    .get(controllers.detail);

  app.route('/banks-find/:bank')
    .get(controllers.spesific);

  app.route('/all-banks')
    .get(controllers.all);

  app.route('/all-banks/:count')
    .get(controllers.few);

  app.route('/banks/:id')
    .put(Auth, Upload, controllers.update);

  app.route('/banks/:id')
    .delete(Auth, controllers.delete);
};
