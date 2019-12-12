const news = require('../controllers/news');
const Upload = require('../middleware/upload');
const Auth = require('../middleware/auth');

module.exports = (app) => {
  app.route('/news')
    .post(Auth, Upload, news.create);

  app.route('/news/:id')
    .get(news.detail);

  app.route('/all-news')
    .get(news.allNews);

  app.route('/career')
    .get(news.career);

  app.route('/event')
    .get(news.event);

  app.route('/all-news/:count')
    .get(news.fewNews);

  app.route('/news/:id')
    .put(Auth, Upload, news.update);

  app.route('/news/:id')
    .delete(Auth, news.delete);
};
