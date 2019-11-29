const controllers = require('../controllers/flash');

module.exports = (app) => {
  app.route('/flash')
    .post(controllers.create);

  app.route('/flash/:id')
    .get(controllers.detail);

  app.route('/all-flash')
    .get(controllers.all);

  app.route('/all-brands/:count')
    .get(controllers.few);

  app.route('/flash/:id')
    .put(controllers.update);

  app.route('/flash/:id')
    .delete(controllers.delete);
};
