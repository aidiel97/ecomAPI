const controllers = require('../controllers/chatDetails');
const Auth = require('../middleware/auth');

module.exports = (app) => {
  app.route('/chat-details')
    .post(Auth, controllers.create);

  app.route('/chat-details/:id')
    .get(controllers.detail);

  app.route('/all-chat-details')
    .get(controllers.all);

  app.route('/all-chat-details/:count')
    .get(controllers.few);

  app.route('/chat-details/:id')
    .put(Auth, controllers.update);

  app.route('/chat-details/:id')
    .delete(Auth, controllers.delete);
};
