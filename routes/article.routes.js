const express = require("express");
const router = express.Router();
const passport = require('passport');
const ArticleController = require("../controller/article.controller");

let routes = (app, sequeizeDbContext, mongoDbContext) => {
  articleController = new ArticleController(sequeizeDbContext, mongoDbContext);

  router.get("/mongodb", passport.authenticate('jwt', { session: false }), articleController.getAllFromMongoDb);
  router.get("/mongodb/:id", articleController.getAllFromMongoDb);
  router.post("/mongodb", articleController.createFromMongoDb);
  router.put("/mongodb", articleController.updateFromMongoDb);
  router.delete("/mongodb", articleController.deleteFromMongoDb);

  router.get("/", articleController.getAll);
  router.get("/:id", articleController.getById);
  router.post("/", articleController.create);
  router.put("/", articleController.update);
  router.delete("/", articleController.delete);

  app.use('/article', router);
};

module.exports = routes;