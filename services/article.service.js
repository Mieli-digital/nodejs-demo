const { QueryTypes } = require("sequelize");

class ArticleService{

  constructor(dbContext){
    if(!dbContext)
      throw new Error("invalid dbContext");
    this.dbContext = dbContext;
    this.sequelizeArticleWrapper = dbContext.Article
  }

  async getAll(){
    const articleRequest = await this.sequelizeArticleWrapper.findAll();
    return articleRequest;
  }

  async getAllByName(name){
    //escaped implementation
    const articleRequest = await this.dbContext.sequelize.query(
      'SELECT * FROM Articles WHERE name LIKE :name',{
        replacements: { name },
        type: QueryTypes.SELECT
      }
    );

    // sql injection test
    // const articleRequest = await this.dbContext.sequelize.query(
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

    throw new Error("Something went wrong on delete");
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
}

module.exports = ArticleService