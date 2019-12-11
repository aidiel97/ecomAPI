// const redis = require('redis');

// const client = redis.createClient();

// const responses = require('../responses');

// module.exports = {
//   cache: (req, res, next) => {
//     client.get('category', (err, data) => {
//       if (err) throw err;

//       if (data !== null) {
//         responses.success('cache', res);
//       } else {
//         next();
//       }
//     });
//   },
// };
