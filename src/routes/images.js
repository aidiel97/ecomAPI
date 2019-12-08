const controllers = require('../controllers/images');
const Upload = require('../middleware/upload');

module.exports = (app) => {
  app.route('/image')
    .get(controllers.all);

  app.route('/image/:id')
    .get(controllers.sendImage);

  app.route('/image')
    .post(Upload, controllers.create);

  app.route('/image/:id')
    .delete(controllers.delete);
};
