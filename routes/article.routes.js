const express = require("express");
const router = express.Router();
const ArticleController = require("../controller/article.controller");

let routes = (app, db) => {
  articleController = new ArticleController(db);
  router.get("/", articleController.getAll);
  router.get("/:id", articleController.getById);
  router.post("/", articleController.create);

  app.use('/article', router);
};

module.exports = routes;