const controllers = require('../controllers/brands');

module.exports = (app) => {
  app.route('/companyProfiles')
    .post(controllers.create);

  app.route('/company-rofiles/:id')
    .get(controllers.detail);

  app.route('/all-company-profiles')
    .get(controllers.all);

  app.route('/all-copany-profiles/:count')
    .get(controllers.few);

  app.route('/company-profiles/:id')
    .put(controllers.update);

  app.route('/company-profiles/:id')
    .delete(controllers.delete);
};
