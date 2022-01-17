const express = require('express');
const logger = require('morgan');
const fs = require('fs');
const path = require('path');

const ordersController = require('./controller/orders.controller');
const initIndexRoutes = require('./routes/index.routes');
const initArticleRoutes = require('./routes/article.routes');

//set path
global.__basedir = __dirname;

const app = express();

app.use(logger('dev'));
var accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'), {flags: 'a'}
);
// setup the logger 
app.use(logger('combined', {stream: accessLogStream}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const sequelizeDb = require('./models/index');
sequelizeDb.sequelize.sync({ alter:true });

initIndexRoutes(app);
initArticleRoutes(app, sequelizeDb);


app.listen(3000, () => {
  console.log("Running on Port 3000")
})
