const multer = require('multer');
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');
const path = require('path');
const spacesEndpoint = new aws.Endpoint(process.env.doEndpoint);

var s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId:process.env.doName,
  secretAccessKey:process.env.doSecret,
  bucket: process.env.doSpace,
})

const storage = multerS3({
  s3: s3,
  acl: 'public-read', // this should set the file to Public
  bucket: process.env.doSpace,
  metadata: function (req, file, cb) {
    cb(null, {fieldName: file.fieldname});
  },
  key: function (req, file, cb) {
    cb(null,path.basename(file.originalname ,path.extname(file.originalname))+ '-' + Date.now() + path.extname(file.originalname))
  }
})

  var upload = multer({ storage: storage }); 



  module.exports = upload; 

