

const mediaService = {
    uploadImageFiles: async (req,res)=>{
  
      res.status(200).json({err:false ,filepath:req.files[0].path })
    },


}

module.exports = mediaService