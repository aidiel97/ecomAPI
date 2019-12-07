const user = require('../controllers/users');
const tokenVerification = require('../middleware/auth');
const Upload = require('../middleware/upload');

module.exports = (app) => {
  app.route('/register')
    .post(Upload, user.register);

  app.route('/login')
    .post(user.login);

  app.route('/all-user')
    .get(user.allUser);

  app.route('/all-user/:count')
    .get(user.fewUser);

  app.route('/user/detail/:id')
    .get(tokenVerification, user.detail);

  app.route('/user/update/:id')
    .put(Upload, user.update);

  app.route('/user/delete/:id')
    .delete(user.delete);
};
