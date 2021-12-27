const multer = require('multer');
const fs = require('fs')

const path = require('path');


const storage = multer.diskStorage({
  destination:(req, file, cb)=>{
    cb(null, 'Images')
  }, 
  filename: function(req, file, cb){
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname)); 
  }, 
})


var upload = multer({ storage: storage }); 

// var deleteImage = 
//   fs.unlink(image_path, (err) => {
//     if (err) {
//       console.error(err)
//       return
//     }
  
//     //file removed
//   })



module.exports = {
  upload
  //,deleteImage

}; 

