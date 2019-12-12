const user = require('../controllers/users');
const Auth = require('../middleware/auth');
const Upload = require('../middleware/upload');

module.exports = (app) => {
  app.route('/register')
    .post(Upload, user.register);

  app.route('/login')
    .post(user.login);

  app.route('/all-user')
    .get(Auth, user.allUser);

  app.route('/all-user/:count')
    .get(Auth, user.fewUser);

  app.route('/user/detail/:id')
    .get(Auth, user.detail);

  app.route('/user/update/:id')
    .put(Auth, Upload, user.update);

  app.route('/user/delete/:id')
    .delete(Auth, user.delete);
};
