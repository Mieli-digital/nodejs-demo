const express = require('express');
const logger = require('morgan');
const fs = require('fs');
const path = require('path');
require('dotenv').config()

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

const MongoDbContextFactory = require('./connections/mongodb.context');
const mongoDbContext = new MongoDbContextFactory({
  username: "root",
  password: process.env.MONGO_INITDB_ROOT_PASSWORD,
  host: "localhost",
  port: 27017,
  database: process.env.MONGO_INITDB_DATABASE
});

const S3ContextFactory = require('./connections/s3.context');
const s3Context = new S3ContextFactory({
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
  host: "localhost",
});

const initIndexRoutes = require('./routes/index.routes');
const initArticleRoutes = require('./routes/article.routes');

initIndexRoutes(app, s3Context);
initArticleRoutes(app, sequelizeDb, mongoDbContext);

app.listen(3000, () => {
  console.log("Running on Port 3000")
})
