require('./databases');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
const publicDir = require('path').join(__dirname, '../public');

const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admins');
const newsRoutes = require('./routes/news');
const brandsRoutes = require('./routes/brands');
const categoryRoutes = require('./routes/categories');
const flashRoutes = require('./routes/flash');
const promosRoutes = require('./routes/promos');
const transactionsRoutes = require('./routes/transactions');
const banksRoutes = require('./routes/banks');
const companyProfilesRoutes = require('./routes/companyProfiles');
const contactUsRoutes = require('./routes/contactUs');
const chatsRoutes = require('./routes/chats');
const chatsDetailsRoutes = require('./routes/chatDetails');
const sliderRoutes = require('./routes/slider');
const faqRoutes = require('./routes/faqs');
const productRoutes = require('./routes/products');
const imageRoutes = require('./routes/images');

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
app.use(express.static(publicDir));

// index sample
// app.get('/', (req, res) => {
//   res.sendFile(`${__dirname}/index.html`);
// });

// All routes
adminRoutes(app);
userRoutes(app);
newsRoutes(app);
brandsRoutes(app);
categoryRoutes(app);
flashRoutes(app);
promosRoutes(app);
transactionsRoutes(app);
banksRoutes(app);
companyProfilesRoutes(app);
contactUsRoutes(app);
chatsRoutes(app);
chatsDetailsRoutes(app);
sliderRoutes(app);
faqRoutes(app);
productRoutes(app);
imageRoutes(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
