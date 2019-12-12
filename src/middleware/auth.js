// const jwt = require('jsonwebtoken');

// const secretKey = process.env.SECRET_KEY;

const index = (req, res, next) => {
  // if (!req.headers.authorization) {
  //   res.status(403).send({ status: 'error', auth: false, message: 'No token provided.' });
  // }

  // const token = req.headers.authorization;

  // jwt.verify(token, secretKey, (err, decoded) => {
  //   if (err) res.status(500).send({ status: 'error', auth: false, message: 'Invalid Token' });

  //   req.data = decoded;
  //   next();
  // });
  console.log('jwt called');
  next();
};

module.exports = index;
