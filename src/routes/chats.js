const controllers = require('../controllers/chats');

module.exports = (app) => {
  app.route('/chats')
    .post(controllers.create);

  app.route('/chats/:id')
    .get(controllers.detail);

  app.route('/all-chats')
    .get(controllers.all);

  app.route('/all-chats/:count')
    .get(controllers.few);

  app.route('/chats/:id')
    .put(controllers.update);

  app.route('/chats/:id')
    .delete(controllers.delete);
};
