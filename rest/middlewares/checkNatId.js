const User = require('../models/Users');


var natIdAvail =async (req, res, next) => {
    const natId = req.body.natId;

    const checkMobile = await User.findOne({natId:natId});
    if(checkMobile){

        return res.status(200).json({er:true, no:5, message:'الرقم القومى مستخدم سابقاً',token:'' })
    }
    return next()

  }



  module.exports = natIdAvail