const S3Service = require("../services/s3.service");

class S3Controller{

  constructor(s3Context){
    if(!s3Context)
      throw new Error("missing s3Context");

    this.s3Service = new S3Service(s3Context);
  }

  useMulter = async (req, res) => {
    return this.s3Service.useMulter(req,res)
  };

  upload = async (req, res) => {
    try {
      this.s3Service.uploadFile(req.file);
      if (req.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
      }      
      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
      });
    } catch (err) {
      res.status(500).send({
        message: `Could not upload the file: ${req.file.originalname}. ${err}`,
      });
    }
  };  
  
  getFileList = (req, res) => {
    this.s3Service.getFileList()
    .then(result => {
      res.status(200).send(result.Contents);
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not load filelist: ${err}`,
      });
    })
  };
  
  download = (req, res) => {
    let fileStream = this.s3Service.download(req.params.name)
    res.attachment(req.params.name);
    fileStream.pipe(res);
  };
}

module.exports = S3Controller;

