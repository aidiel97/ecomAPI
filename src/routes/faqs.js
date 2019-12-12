const controllers = require('../controllers/faqs');
const Auth = require('../middleware/auth');

module.exports = (app) => {
  app.route('/faq')
    .post(Auth, controllers.create);

  app.route('/faq/:id')
    .get(controllers.detail);

  app.route('/all-faq')
    .get(controllers.all);

  app.route('/all-faq/:count')
    .get(controllers.few);

  app.route('/faq/:id')
    .put(Auth, controllers.update);

  app.route('/faq/:id')
    .delete(Auth, controllers.delete);
};
