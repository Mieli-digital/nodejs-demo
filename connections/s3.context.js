var AWS = require('aws-sdk');
class S3Context{
  constructor(s3Config){
    if(!s3Config)
      throw new Error("missing s3Config");

    this.s3Context  = new AWS.S3({
      accessKeyId: s3Config.accessKey,
      secretAccessKey: s3Config.secretKey,
      endpoint: 'http://127.0.0.1:9000' ,
      s3ForcePathStyle: true, // needed with minio?
      signatureVersion: 'v4'
    });
  }
}

module.exports = S3Context
