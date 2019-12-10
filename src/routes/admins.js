const admin = require('../controllers/admins');
// const tokenVerification = require('../middleware/auth');
const Upload = require('../middleware/upload');

module.exports = (app) => {
  app.route('/admin/register')
    .post(Upload, admin.register);

  app.route('/admin/login')
    .post(admin.login);

  app.route('/all-admin')
    .get(admin.alladmin);

  app.route('/all-admin/:count')
    .get(admin.fewadmin);

  app.route('/admin/detail/:id')
    .get(admin.detail);

  app.route('/admin/update/:id')
    .put(Upload, admin.update);

  app.route('/admin/delete/:id')
    .delete(admin.delete);
};
