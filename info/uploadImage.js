const multer = require('multer');
var multerGoogleStorage = require("multer-google-storage");

var aws = require('aws-sdk');
var multerS3 = require('multer-s3');
const path = require('path');
const spacesEndpoint = new aws.Endpoint(process.env.doEndpoint);



var s3 = new aws.S3({
  //endpoint: spacesEndpoint,
  accessKeyId:process.env.asID,
  secretAccessKey:process.env.asSecretID,
  //bucket: process.env.asBucket,
})

const storage = multerS3({
  s3: s3,
  acl: 'public-read', // this should set the file to Public
  bucket: process.env.asBucket,
  metadata: function (req, file, cb) {
    cb(null, {fieldName: file.fieldname});
  },
  key: function (req, file, cb) {
    cb(null,path.basename(file.originalname ,path.extname(file.originalname))+ '-' + Date.now() + path.extname(file.originalname))
  }
})
// const storage = multerGoogleStorage.storageEngine({
//   acl:"publicread"
// })

var upload = multer({ storage: storage }); 

var deleteImage = async(image)=>{
  var params = {
    Bucket: process.env.asBucket,
    Key: image
};
  await s3.deleteObject(params, function(err, data) {
    if (err) return err;
    else     return true;
  });

}

module.exports = {
  upload,
  deleteImage

}; 

