const controllers = require('../controllers/promos');

module.exports = (app) => {
  app.route('/promos')
    .post(controllers.create);

  app.route('/promos/:id')
    .get(controllers.detail);

  app.route('/all-promos')
    .get(controllers.all);

  app.route('/all-promos/:count')
    .get(controllers.few);

  app.route('/promos/:id')
    .put(controllers.update);

  app.route('/promos/:id')
    .delete(controllers.delete);
};
