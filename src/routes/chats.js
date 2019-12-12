const controllers = require('../controllers/chats');
const Auth = require('../middleware/auth');

module.exports = (app) => {
  app.route('/chats')
    .post(Auth, controllers.create);

  app.route('/chats/:id')
    .get(controllers.detail);

  app.route('/all-chats')
    .get(controllers.all);

  app.route('/all-chats/:count')
    .get(controllers.few);

  app.route('/chats/:id')
    .put(Auth, controllers.update);

  app.route('/chats/:id')
    .delete(Auth, controllers.delete);
};
