const slider = require('../controllers/slider');

module.exports = (app) => {
  app.route('/slider')
    .post(slider.create);

  app.route('/slider/:id')
    .get(slider.detail);

  app.route('/gambar-slider/:code')
    .get(slider.detailByCode);

  app.route('/all-slider')
    .get(slider.all);

  app.route('/all-slider/:count')
    .get(slider.few);

  app.route('/slider/:id')
    .put(slider.update);

  app.route('/slider/:id')
    .delete(slider.delete);
};
