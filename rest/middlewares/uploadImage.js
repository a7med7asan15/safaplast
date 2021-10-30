const multer = require('multer');

const path = require('path');


const storage = multer.diskStorage({
  destination: './public/images/', 
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); 
  }, 
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

