const express = require("express");
const router = express.Router();
const ArticleController = require('../controller/article.controller');

let routes = (app, sequelizeDb, mongoDbContext) => {
  let articleController = new ArticleController(sequelizeDb, mongoDbContext)

  router.get("/mongodb", articleController.getAllFromMongoDb);
  router.get("/mongodb/:id", articleController.getAllFromMongoDb);
  router.post("/mongodb", articleController.createFromMongoDb);
  router.put("/mongodb", articleController.updateFromMongoDb);
  router.delete("/mongodb", articleController.deleteFromMongoDb);

  router.get("/", articleController.getAll);
  router.get("/:id", articleController.getByID);
  router.post("/", articleController.post);
  router.put("/", articleController.put);
  router.delete("/", articleController.delete);

  app.use('/article', router);
}

module.exports = routes;