const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const PropertySchema = require('../models/propertySchema')
const mediaService = {
    uploadImageFiles: async (req,res)=>{
      
      res.status(200).json({err:false ,filepath:req.files[0].path})
    },
    deleteImage:async (req,res)=>{
      const {exist} = req.query;
      const {postId , imageUrl , imageId} = req.body;
      console.log(imageUrl);
      let imageName =imageUrl.split('/')
          imageName = imageName[imageName.length - 1]
      try{
        if(exist === 'true'){
          const property = await PropertySchema.findById(postId);
                property.images.id(imageId).remove();
                await property.save();
        } 
        const deleteFile = await storage.bucket(process.env.GCS_BUCKET).file(imageName).delete();
      }catch(err){

        console.log(err)
      }
    }


}

module.exports = mediaService