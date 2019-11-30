const user = require('../controllers/users');
// const images = require('../controllers/images');
// const upload = require('../middleware/upload');

module.exports = (app) => {
  app.route('/register')
    .post(user.register);

  app.route('/login')
    .post(user.login);

  app.route('/all-user')
    .get(user.allUser);

  app.route('/all-user/:count')
    .get(user.fewUser);

  app.route('/user/detail/:id')
    .get(user.detail);

  app.route('/user/update/:id')
    .put(user.update);

  app.route('/user/delete/:id')
    .delete(user.delete);
};
