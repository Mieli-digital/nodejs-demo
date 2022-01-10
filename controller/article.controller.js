const ArticleService = require('../services/article.service')

class ArticleController {
  constructor(dbContext){
    if(!dbContext)
      throw new Error("invalid dbContext");
    
    this.articleService = new ArticleService(dbContext);
  }

  getAll = async (req, res) => {
    if(!req.query.name){
      try {
        res.send(await this.articleService.getAll());
        return;
      } catch (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while getting Articles."
        });
      }
    }

    try {
      res.send(await this.articleService.getAllByName(req.query.name));
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting Articles."
      });
    }

    
  }

  getById = async (req, res) => {
    // Validate request
    if (!req.params.id) {
      res.status(400).send({
        message: "Id missing!"
      });
      return;
    }

    try {
      res.send(await this.articleService.getById(parseInt(req.params.id)));
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting Articles."
      });
    }
  }

  create = async (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    try{
      let article = await this.articleService.create({
        name: req.body.name,
        cost: req.body.cost,
        type: req.body.type
      })
      res.send(article);
    } catch(err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Article."
      });
    }
    
  };
}

module.exports = ArticleController