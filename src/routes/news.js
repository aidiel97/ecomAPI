const news = require('../controllers/news');

module.exports = (app) => {
  app.route('/news')
    .post(news.create);

  app.route('/news/:id')
    .get(news.detail);

  app.route('/all-news')
    .get(news.allNews);

  app.route('/all-news/:count')
    .get(news.fewNews);

  app.route('/news/:id')
    .put(news.update);

  app.route('/news/:id')
    .delete(news.delete);
};
