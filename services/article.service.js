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

  async getById(id){
    if(!id)
      throw new Error("id invalid");
    
    const articleRequest = await this.sequelizeArticleWrapper.findAll({
      where: {
        id: id
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
}

module.exports = ArticleService