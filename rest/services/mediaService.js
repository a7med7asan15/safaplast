const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const {deleteImage} = require('../middlewares/uploadImage');

const PropertySchema = require('../models/propertySchema')

const mediaService = {
    uploadImageFiles: async (req,res)=>{
        //console.log(req.files)
      res.status(200).json({err:false ,filepath:req.files[0].location})
    },
    deleteImage:async (req,res)=>{
      const {exist} = req.query;
      const {postId , imageUrl , imageId} = req.body;
      let imageName = imageUrl.split('/')
          imageName = imageName[imageName.length - 1]
      try{
        if(exist === 'true'){
          const property = await PropertySchema.findById(postId);
                property.images.id(imageId).remove();
                await property.save();
        } 
        const deleteFile = await deleteImage(imageName);
      }catch(err){

        console.log(err)
      }
    }


}

module.exports = mediaService