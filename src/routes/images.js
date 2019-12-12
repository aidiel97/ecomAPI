const controllers = require('../controllers/images');
const Upload = require('../middleware/upload');
const Auth = require('../middleware/auth');

module.exports = (app) => {
  app.route('/image')
    .get(controllers.all);

  app.route('/image/:id')
    .get(controllers.sendImage);

  app.route('/image')
    .post(Auth, Upload, controllers.create);

  app.route('/image/:id')
    .delete(Auth, controllers.delete);
};
