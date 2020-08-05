const User = require('../models/Users');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const authService ={
    checkEmail: async (email,password)=>{
        try{
            const user = await User.findOne({email:email})
                if(user){
                   const passCheck =  await user.comparePassword(password)
                   if(!passCheck){
                    return {
                        error:true,
                        message:'wrong Password',
                        user:{}
                    }
                   }
                    return {
                        error:false,
                        message:'User Found and Password Matches ',
                        user:user
                    }
                    
                }
                return {
                    error:true,
                    message:'User Not Found',
                    user:{}
                }
                
            }catch(err){
                return {
                    error:true,
                    message:'Error in the response',
                    user:{}
                }
        }
    },
    signToken : async (user)=>{
        try{
           
           const sign = await jwt.sign({user:{id:user._id,username:user.username}},process.env.JWTsecret)
           if(!sign){

                return {
                    error:true,
                    msg:'Error In signing'
        
                }
            }
            return {
                error:false,
                msg:'Perfectly Signed',
                token:sign
            }
        }catch(err){
            return {
                error:true,
                msg:'response Error'
            }
        }

    },
    login: async (req,res)=>{
        
        const {email,password }= req.body;
        
        try{
            // Check For user and compare Passwords 
         let  userObj = await authService.checkEmail(email,password);
               
         if(userObj.error)
         {

                   //if No User Found Return No User Message 
                   return res.json({error:true,msg:userObj.message});
         
        }

        /// Deconstruct User To Ger The User Object 

        let {user} = userObj; 

        // Sign User Token With  sending The User Data Required 

        let sign = await authService.signToken(user);
        
        // if Sign error Return Error 

        if(sign.error)

        {
        
                /// Return The errror 
              return res.json({error:true,msg:sign.message});
        
        
        }

        /// Return The Signed token If Everything is Ok ;

         return res.json({error:false,msg:userObj.message , token:sign.token});


        }catch(err){

            // Catch Unhandled Errors // 

            return   res.json(err);

        }
    },
    checkToken: async ( req, res ) => {
        console.log(req.user);
    },
    destroy: async (req , res )=>{
        req.session.destroy(()=>{
            res.redirect('/dashboard/login')
        })  
    }
}

module.exports = authService