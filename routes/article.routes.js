const express = require("express");
const router = express.Router();
const passport = require('passport');
const { ROLES } = require("../auth/roles");
const RoleValidator = require("../auth/roles.validator");
const ArticleController = require("../controller/article.controller");

let routes = (app, sequeizeDbContext, mongoDbContext) => {
  let articleController = new ArticleController(sequeizeDbContext, mongoDbContext);
  let roleValidator = new RoleValidator();
  router.get(
    "/mongodb", 
    passport.authenticate('jwt', { session: false }), 
    roleValidator.checkIsInRole(ROLES.Admin),
    articleController.getAllFromMongoDb);
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