const ArticleService = require('../services/article.service');

class ArticleController {
  constructor(sequelizeDbContext){
    if(!sequelizeDbContext)
      throw new Error("invalid sequelizeDbContext");
    
    this.articleService = new ArticleService(sequelizeDbContext);
  }

  getAll = async(req, res) => {
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
  getByID = async(req, res) => {
    // Validate request
    if (!req.param.id) {
      res.status(400).send({
        message: "Id missing!"
      });
      return;
    }
    try {
      res.send(await this.articleService.getByID(req.param.id));
    } catch(err) {
      res.status(500).send({
        message: err.message || "Something went wrong T.T"
      })
    }
  }
  post = async(req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      res.send(await this.articleService.create({
        name: req.body.name,
        cost: req.body.cost,
        type: req.body.type
      }));
    } catch(err) {
      res.status(500).send({
        message: err.message || "Something went wrong T.T"
      })
    }
  }
  put = async(req, res) => {
    if(!req.query.id) {
      res.status(400).send({
        message: "Id can not be empty!"
      });
      return;
    }    
    if(!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      res.send(await this.articleService.update(req.query.id, {
        name: req.body.name,
        cost: req.body.cost,
        type: req.body.type
      }));
    } catch(err) {
      res.status(500).send({
        message: err.message || "Something went wrong T.T"
      })
    }
  }
  delete = async(req, res) => {
    if(!req.query.id) {
      res.status(400).send({
        message: "Id can not be empty!"
      });
      return;
    }

    try {
      res.send(await this.articleService.delete(req.query.id));
    } catch(err) {
      res.status(500).send({
        message: err.message || "Something went wrong T.T"
      })
    }
  }
}

module.exports = ArticleController