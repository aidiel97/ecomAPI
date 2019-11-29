const controllers = require('../controllers/contactUs');

module.exports = (app) => {
  app.route('/contact-us')
    .post(controllers.create);

  app.route('/contact-us/:id')
    .get(controllers.detail);

  app.route('/all-contact-us')
    .get(controllers.all);

  app.route('/all-contact-us/:count')
    .get(controllers.few);

  app.route('/contact-us/:id')
    .put(controllers.update);

  app.route('/contact-us/:id')
    .delete(controllers.delete);
};
