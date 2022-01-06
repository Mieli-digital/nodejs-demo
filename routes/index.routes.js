const express = require("express");
const router = express.Router();
const service = require("../controller/files.controller");

let routes = (app) => {
  router.post("/upload", service.upload);
  router.get("/files", service.getListFiles);
  router.get("/files/:name", service.download);

  app.use(router);
};

module.exports = routes;