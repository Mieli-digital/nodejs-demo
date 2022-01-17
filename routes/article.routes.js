const express = require("express");
const router = express.Router();
const ArticleController = require('../controller/article.controller');

let routes = (app, sequelizeDb) => {
  let articleController = new ArticleController(sequelizeDb)

  router.get("/", articleController.getAll);
  router.get("/:id", articleController.getByID);
  router.post("/", articleController.post);
  router.put("/", articleController.put);
  router.delete("/", articleController.delete);

  app.use('/article', router);
}

module.exports = routes;