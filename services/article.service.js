const { QueryTypes } = require("sequelize");

class ArticleService {
  constructor(sequelizeDbContext){
    if(!sequelizeDbContext)
      throw new Error("invalid sequelizeDbContext");
    
    this.sequelizeDbContext = sequelizeDbContext;
    this.sequelizeArticleWrapper = sequelizeDbContext.article
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
}

module.exports = ArticleService