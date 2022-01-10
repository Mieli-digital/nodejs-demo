const express = require("express");
const router = express.Router();
const service = require("../controller/files.controller");

let routes = (app) => {
  router.post("/upload", (req, res, next) => {
    console.log(req.file);
    next();
  } , service.upload);
  router.get("/files", service.getListFiles);
  router.get("/files/:name", service.download);

  app.use(router);
};

module.exports = routes;