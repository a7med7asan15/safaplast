const User = require('../models/Users');




const userCrud = {

        getUserProfileData : async (req,res)=>{
            const resData = {
                firstname : req.user.firstname,
                lastname : req.user.lastname,
                area : req.user.area ? req.user.area :{title:'',value:''},
                birthdate:req.user.birthdate ? req.user.birthdate : false

            }
          
            return res.status(200).json({error:false, no:null, resData})

        }


}



module.exports = userCrud;