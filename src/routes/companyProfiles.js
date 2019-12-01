const controllers = require('../controllers/companyProfiles');

module.exports = (app) => {
  app.route('/company-profiles')
    .post(controllers.create);

  app.route('/company-profiles/:id')
    .get(controllers.detail);

  app.route('/all-company-profiles')
    .get(controllers.all);

  app.route('/all-company-profiles/:count')
    .get(controllers.few);

  app.route('/company-profiles/:id')
    .put(controllers.update);

  app.route('/company-profiles/:id')
    .delete(controllers.delete);
};
