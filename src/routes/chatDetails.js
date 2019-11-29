const controllers = require('../controllers/chatDetails');

module.exports = (app) => {
  app.route('/chat-details')
    .post(controllers.create);

  app.route('/chat-details/:id')
    .get(controllers.detail);

  app.route('/all-chat-details')
    .get(controllers.all);

  app.route('/all-chat-details/:count')
    .get(controllers.few);

  app.route('/chat-details/:id')
    .put(controllers.update);

  app.route('/chat-details/:id')
    .delete(controllers.delete);
};
