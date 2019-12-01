const controllers = require('../controllers/faqs');

module.exports = (app) => {
  app.route('/faq')
    .post(controllers.create);

  app.route('/faq/:id')
    .get(controllers.detail);

  app.route('/all-faq')
    .get(controllers.all);

  app.route('/all-faq/:count')
    .get(controllers.few);

  app.route('/faq/:id')
    .put(controllers.update);

  app.route('/faq/:id')
    .delete(controllers.delete);
};
