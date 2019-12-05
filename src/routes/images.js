const controllers = require('../controllers/images');

module.exports = (app) => {
  app.route('/image')
    .get(controllers.all);

  app.route('/image/:id')
    .get(controllers.sendImage);

  app.route('/image')
    .post(controllers.create);

  app.route('/image/:id')
    .delete(controllers.delete);
};
