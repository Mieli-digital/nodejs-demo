const { QueryTypes } = require("sequelize");

class ArticleService {
  constructor(sequelizeDbContext, mongodbContext){
    if(!sequelizeDbContext)
      throw new Error("invalid sequelizeDbContext");
    if(!mongodbContext)
      throw new Error("invalid mongodbContext");
    
    this.sequelizeDbContext = sequelizeDbContext;
    this.sequelizeArticleWrapper = sequelizeDbContext.articleModel

    this.mongoDbContext = mongodbContext;
  }

  async getAll(){
    return await this.sequelizeArticleWrapper.findAll();
  }

  async getAllByName(name){
    if(!name)
      throw new Error("name invalid");

    //escaped implementation
    const articleRequest = await this.sequelizeDbContext.sequelize.query(
      'SELECT * FROM articles WHERE name LIKE :name',{
        replacements: { name },
        type: QueryTypes.SELECT
      }
    );
    // 'SELECT * FROM Articles WHERE name LIKE ' + name
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
      throw new Error("articleModel is invalid");
    
    const articleModel = await this.sequelizeArticleWrapper.create(articleDto);

    return articleModel;
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


  //// mongodb implementation

  async getAllFromMongoDb(){
    return this.mongoDbContext.articleModel.find({});
  }

  async getByIdFromMongoDb(articleId){
    if(!articleId)
      throw new Error('articleId missing');

    return this.mongoDbContext.articleModel.find(articleId).exec();
  }

  async createFromMongoDb(articleDto){
    if(!articleDto)
      throw new Error("articleModel is invalid");

    console.log(this.mongoDbContext);

    this.mongoDbContext.articleModel.create(articleDto, (err) => {
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

    console.log(this.mongoDbContext);

    this.mongoDbContext.articleModel.findOneAndUpdate({ id: articleId }, articleDto, (err, updateArticle) => {
      if(err)
        throw new Error("Something went wrong on update: ", err)
      
      return updateArticle;
    })
  }

  async deleteFromMongoDb(articleId){
    if(!articleId)
      throw new Error("id invalid");
    
    let articleModel = await this.mongoDbContext.articleModel.findOne({ _id: articleId }).exec();
    if(articleModel === null){
      throw new Error("Something went wrong on delete: articleModel not found");
    }
      
    else {
      let articleDeleteResponse = await this.mongoDbContext.articleModel.deleteOne({ _id: articleId }).exec();
      return articleDeleteResponse;
    }
  }
}

module.exports = ArticleService