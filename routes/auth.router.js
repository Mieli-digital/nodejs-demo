const express = require("express");
const router = express.Router();
const AuthControler = require('../controller/auth.controller');

let routes = (app, mongoDbContext) => {
  let authController = new AuthControler(mongoDbContext);
  router.post("/login", authController.login);
  router.post("/register", authController.register);

  app.use('/auth', router);
};

module.exports = routes;