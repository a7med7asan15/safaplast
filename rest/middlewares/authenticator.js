
const User = require('../models/Users');

 

const auth = {

authMiddleware : (req ,res,next) => {
    if(!req.isAuthenticated())
        {
        return res.redirect('/dashboard/login')
        }
    
    return next()

},

 NotAuth : (req,res,next)=>{
    if(req.isAuthenticated())
    {
        return res.redirect('/dashboard')
    }
    return next()
},

preUsedEmail :  async (req,res,next)=>{


    const {email} = req.body;

    try{

        const oldEmail = await User.findOne({email:email})

        if(oldEmail){
            req.session.passedData  = req.body    
            req.flash('error', {message:'This Email is Used before'})
            console.log(req.originalUrl);
            return res.redirect(`${req.originalUrl}`)
        }


        return next();


    } catch(err){

        req.flash('error', 'Something Went wrong')
        return res.redirect('/dashboard/users/add')

    }     
    
},
sameEmail: async (req,res,next)=>{
    const {email} = req.body
    const {userId} = req.params 
    try{
        const oldEmail = await User.findOne({email:email})
        
        if(oldEmail){
            if(oldEmail.id === userId ){
                return next();
            }
            req.session.passedData  = req.body    
            req.flash('error', {message:'This Email is Used before'})
            return res.redirect(`${req.originalUrl}`)
        }
        return next();
    } catch(err){
        req.flash('error', 'Something Went wrong')
        return res.redirect('/dashboard/users/add')
    }     
    
},
idAdmin : (req,res,next)=>{
    if(req.user.role === 0 ){
        
        return next();
        
    }
    return res.redirect('/dashboard/login')
    
}

}

module.exports = auth;