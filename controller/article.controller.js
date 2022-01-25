const ArticleService = require('../services/article.service');

class ArticleController {
  constructor(sequelizeDbContext, mongodbContext){
    if(!sequelizeDbContext)
      throw new Error("invalid sequelizeDbContext");
    if(!mongodbContext)
      throw new Error("invalid mongodbContext");
    
    this.articleService = new ArticleService(sequelizeDbContext, mongodbContext);
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

  //// mongodb controller functions
  getAllFromMongoDb = async (req, res) => {
    try {
      res.send(await this.articleService.getAllFromMongoDb());
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting Articles."
      });
    }  
  }

  getByIdFromMongoDb = async (req, res) => {
    // Validate request
    if (!req.param.id) {
      res.status(400).send({
        message: "Id missing!"
      });
      return;
    }
    try {
      res.send(await this.articleService.getByIdFromMongoDb(req.param.id));
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting Articles."
      });
    }  
  }

  createFromMongoDb = async (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    try {
      let article = await this.articleService.createFromMongoDb({
        name: req.body.name,
        cost: req.body.cost,
        type: req.body.type
      });
      res.send(article);
    } catch(err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Article."
      });
    }
  }

  updateFromMongoDb = async (req, res) => {    
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
      let updateArticleResponse = await this.articleService.updateFromMongoDb(req.query.id, {
        name: req.body.name,
        cost: req.body.cost,
        type: req.body.type
      });
      res.send(updateArticleResponse);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the Article."
      });
    }
  }

  deleteFromMongoDb = async (req, res) => {
    if(!req.query.id) {
      res.status(400).send({
        message: "Id can not be empty!"
      });
      return;
    }

    try {
      let deleteArticleResponse = await this.articleService.deleteFromMongoDb(req.query.id);
      res.send(deleteArticleResponse);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting Articles."
      });
    }  
  }
}

module.exports = ArticleController