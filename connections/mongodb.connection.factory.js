const mongoose = require('mongodb');

class MongoConnectionFactory{
  constructor(mongodbConnectionConfig){
    if(!mongodbConnectionConfig)
      throw new Error("missing mongodbConfig");
      
    // url example:
    // mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
    let url = `mongodb://
      ${mongodbConnectionConfig.username}
      :${mongodbConnectionConfig.password}
      @${mongodbConnectionConfig.host}
      /${mongodbConnectionConfig.database}
      `
    mongoose.connect(url)

    this.dbContext = mongoose.connection
    dbContext.once('open', _ => {
      console.log('Database connected:', url)
    })

    dbContext.on('error', err => {
      console.error('connection error:', err)
      throw new Error("connection lost, something went wrong")
    });
  }

  getConnection(){
    return this.dbContext;
  }
}

module.exports = MongoConnectionFactory;