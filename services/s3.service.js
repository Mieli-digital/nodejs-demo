const util = require("util");
const multer = require("multer");

class S3Service {
  constructor(s3Context){
    if(!s3Context)
      throw new Error("missing s3Context");

    this.s3Context = s3Context;
    this.maxSize = 2 * 1024 * 1024;
  }

  uploadFile(fileData){    
    try {
      let bucketParams = {
        Bucket: "generic",
        Key: fileData.originalname,
        Body: Buffer.from(fileData.buffer, 'binary')
      }

      // Uploading files to the bucket
      this.s3Context.s3Context.upload(bucketParams, (err) => {
        if (err) {
          throw err;
        }
        return;
      });
    } catch(err){
      throw new Error("Something went wrong on upload: ", err);
    }
  }

  getFileList(){
    try{
      let bucketParams = {
        Bucket: "generic"
      }
      return this.s3Context.s3Context.listObjects(bucketParams).promise();
    } catch (err) {
      throw new Error("Something went wrong on getting fileslist: ", err);
    }
  }

  download(fileKey){
    if(!fileKey)
      throw new Error("fileKey missing");
    try{
      let bucketParams = {
        Bucket: "generic",
        Key: fileKey.toString(),
        Range: "bytes=0-9"
      }
      return this.s3Context.s3Context.getObject(bucketParams).createReadStream();
    } catch (err) {
      throw new Error("Something went wrong on getting fileslist: ", err);
    }
  }
}

module.exports = S3Service;