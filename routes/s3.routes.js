const express = require("express");
const router = express.Router();
const multer = require("multer");
const service = require("../controller/files.controller");
const S3Controller = require("../controller/s3.controller");


let routes = (app, s3Context) => {
  const s3Controller = new S3Controller(s3Context);

  router.post("/upload", multer({
    storage: multer.memoryStorage()
  }).single("file"), s3Controller.upload);
  router.get("/files", s3Controller.getFileList);
  router.get("/files/:name", s3Controller.download);

  app.use('/s3', router);
};

module.exports = routes;