const User = require('../models/Users');


var mobileAvail =async (req, res, next) => {
    const mobileNo = req.body.mobileNo;

    const checkMobile = await User.findOne({mobileNo:mobileNo});
    if(checkMobile){

        return res.status(200).json({er:true, no:5, message:'رقم الموبايل مستخدم سابقا ',token:'' })
    }
    return next()

  }



  module.exports = mobileAvail