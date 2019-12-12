const controllers = require('../controllers/companyProfiles');
const Auth = require('../middleware/auth');

module.exports = (app) => {
  app.route('/company-profiles')
    .post(Auth, controllers.create);

  app.route('/company-profiles/:id')
    .get(controllers.detail);

  app.route('/all-company-profiles')
    .get(controllers.all);

  app.route('/all-company-profiles/:count')
    .get(controllers.few);

  app.route('/company-profiles/:id')
    .put(Auth, controllers.update);

  app.route('/company-profiles/:id')
    .delete(Auth, controllers.delete);
};
