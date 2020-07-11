const User = require('../models/Users');
const activateAccountEmail = require('../helpers/sendEmail')
const _ = require('lodash');
const {signToken} = require('../helpers/jwt');
const resetPasswordEmail = require('../helpers/resetpasswordemailhandler');
const axios = require('axios');
const authService ={
    register : async (req,res)=>{
        var mn =  '2' + req.body.mobileNo;
        const userData = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            mobileNo:req.body.mobileNo,
            natId:req.body.natId,
            pin:req.body.pin
        }

        try{
         const newUser = new User(userData)
        const user = await newUser.save();
        console.log(user);
        if(user){
            const token = signToken(user.id);
            return res.status(200).json({error:false, no:null, message:'تم تسجيل الحساب بنجاح' , token,})
        }

        }catch(e){

           return res.status(200).json({error:true, no:null, message:'error In Creating Account' , token:'',er:err})
            
        }
 
 
    },
    login: async (req,res)=>{
        const email = req.body.email;
        const pin = req.body.pin; 
        const getUser = await User.findOne({email: email })
        console.log(getUser)
        if(!getUser) {
            return res.status(200).json({er:true, no:5, message:'هناك خطاء فى بيانات التسجيل ',token:'' })
        }
        const isMatch = await getUser.comparePassword(pin);
        if(!isMatch){
            return res.status(200).json({er:true, no:6, message:'هناك خطاء فى بيانات التسجيل ' ,token:''}) 
        }
    
        const token = signToken(getUser.id);
        res.status(200).json({er:false, no:null, message:'تم تسجيل الدخول بنجاح',token ,username:getUser.firstname + ' ' + getUser.lastname})
    },
    resetPassword : async (req,res)=>{
        const email = req.body.email;
        try{

            const getUser = await User.findOne({email: email })

            if(!getUser) {
                return res.status(200).json({er:true, no:8, message:'There\'s No Account with given Email',token:'' })
            }
            const token = signToken(getUser.id);
            await resetPasswordEmail(token , getUser.email);
            return res.status(200).json({er:false, no:null, message:'Please Check Your Email',token:'' })
            
            
        }catch(e){
            console.log(e);
            return res.status(200).json({er:true, no:9, message:e,token:'' })
        }
        
    },
    setresetpassword: async (req,res)=>{
        try{
            
            const user = req.user
            user.password = req.body.password;
            const nu = await user.save();
            return res.status(200).json({er:false, no:null, message:'Password Succefully Changed',token:'' })
        }catch(e){
            console.log(e);
            return res.status(200).json({er:true, no:9, message:e,token:'' })
        }
    }
    
    
}

module.exports = authService