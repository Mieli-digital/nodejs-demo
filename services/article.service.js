const { QueryTypes } = require("sequelize");

class ArticleService{

  constructor(sequelizeDbContext, mongoDbContext){
    if(!sequelizeDbContext)
      throw new Error("invalid sequelizeDbContext");
    if(!mongoDbContext)
      throw new Error("invalid mongoDbContext");
    this.sequelizeDbContext = sequelizeDbContext;
    this.mongoDbContext = mongoDbContext;
    this.sequelizeArticleWrapper = sequelizeDbContext.Article
  }

  //// SequelizeSeviceImpl

  async getAll(){
    const articleRequest = await this.sequelizeArticleWrapper.findAll();
    return articleRequest;
  }

  async getAllByName(name){
    if(!name)
      throw new Error("invalid name");
    //escaped implementation
    const articleRequest = await this.sequelizeDbContext.sequelize.query(
      'SELECT * FROM Articles WHERE name LIKE :name',{
        replacements: { name },
        type: QueryTypes.SELECT
      }
    );

    // sql injection test
    // const articleRequest = await this.sequelizeDbContext.sequelize.query(
    //   'SELECT * FROM Articles WHERE name LIKE ' + name
    // );

    return articleRequest;
  }

  async getById(articleId){
    if(!articleId)
      throw new Error("id invalid");
    
    const articleRequest = await this.sequelizeArticleWrapper.findAll({
      where: {
        id: articleId
      }
    });
    return articleRequest;
  }

  async create(articleDto){
    if(!articleDto)
      throw new Error("article is invalid");
    
    const article = await this.sequelizeArticleWrapper.create(articleDto);

    return article;
  }

  async update(articleId, articleDto){
    if(!articleId)
      throw new Error("id invalid");
    if(!articleDto)
      throw new Error("articleDto is empty");

    const articleRequest = await this.sequelizeArticleWrapper.update(articleDto, { where: {id: articleId}});
    if(articleRequest){
      console.log(articleRequest);
      return "done";
    }

    throw new Error("Something went wrong on update");
  }

  async delete(articleId){
    if(!articleId)
      throw new Error("id invalid");

    const articleRequest = await this.sequelizeArticleWrapper.destroy({ where: { id: articleId}});
    if(articleRequest){
      console.log(articleRequest);
      return "done";
    }

    throw new Error("Something went wrong on delete");
  }


  //// MongoSeviceImpl

  async getAllFromMongoDb(){
    return this.mongoDbContext.article.find({});
  }

  async getAllByNameFromMongoDb(name){
    if(!name)
      throw new Error("invalid name");
    return this.mongoDbContext.article.find({name: name}).exec();
  }

  async getByIdFromMongoDb(articleId){
    if(!articleId)
      throw new Error("id invalid");
    return this.mongoDbContext.article.findByIs(articleId).exec();
  }

  async createFromMongoDb(articleDto){
    if(!articleDto)
      throw new Error("article is invalid");

    this.mongoDbContext.article.create(articleDto, (err) => {
      if(err)
        throw new Error("Something went wrong on create: ", err)
    });
    return("done");
  }

  async updateFromMongoDb(articleId, articleDto){
    if(!articleId)
      throw new Error("id invalid");
    if(!articleDto)
      throw new Error("articleDto is empty");

    this.mongoDbContext.article.findOneAndUpdate({ id: articleId }, articleDto, (err, updateArticle) => {
      if(err)
        throw new Error("Something went wrong on update: ", err)
      
      return updateArticle;
    })
  }

  async deleteFromMongoDb(articleId){
    if(!articleId)
      throw new Error("id invalid");
    
    let article = await this.mongoDbContext.article.findOne({ _id: articleId }).exec();
    if(article === null){
      throw new Error("Something went wrong on delete: article not found");
    }
      
    else {
      let articleDeleteResponse = await this.mongoDbContext.article.deleteOne({ _id: articleId }).exec();
      return articleDeleteResponse;
    }
  }
}

module.exports = ArticleService