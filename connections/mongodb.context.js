const mongoose = require('mongoose');
const articleSchema = require('../mongodb-schemas/article.schema')

class MongoDbContext{
  constructor(mongodbConnectionConfig){
    if(!mongodbConnectionConfig)
      throw new Error("missing mongodbConfig");

    // url example:
    // mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
    let url = `mongodb://${mongodbConnectionConfig.username}:${mongodbConnectionConfig.password}@${mongodbConnectionConfig.host}:${mongodbConnectionConfig.port}`;
    mongoose.connect(url, 
    {
      authSource: 'admin',
      dbName: mongodbConnectionConfig.database,
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    this.dbContext = mongoose.connection;

    this.dbContext.once('open', _ => {
      console.log('Database connected: ',mongodbConnectionConfig.host)
    });

    this.dbContext.on('error', err => {
      console.error('connection error:', err)
      throw new Error("connection lost, something went wrong")
    });

    //init Models
    this.article = mongoose.model('Article', mongoose.Schema(articleSchema));
  }
}

module.exports = MongoDbContext;