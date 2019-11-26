require('./databases');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const userRoutes = require('./routes/users');
const newsRoutes = require('./routes/news');
const brandsRoutes = require('./routes/brands');

// const testRoutes = require('./src/routes');
// const userRoutes = require('./src/routes/user');

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Authorization,Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// All routes
userRoutes(app);
newsRoutes(app);
brandsRoutes(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
