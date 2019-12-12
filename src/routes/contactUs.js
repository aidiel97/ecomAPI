const controllers = require('../controllers/contactUs');
const Auth = require('../middleware/auth');

module.exports = (app) => {
  app.route('/contact-us')
    .post(Auth, controllers.create);

  app.route('/contact-us/:id')
    .get(controllers.detail);

  app.route('/all-contact-us')
    .get(controllers.all);

  app.route('/all-contact-us/:count')
    .get(controllers.few);

  app.route('/contact-us/:id')
    .put(Auth, controllers.update);

  app.route('/contact-us/:id')
    .delete(Auth, controllers.delete);
};
