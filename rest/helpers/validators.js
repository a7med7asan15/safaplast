const  Joi = require('@hapi/joi');


module.exports  = {
    validationBody: (schemas)=>{
        return (req,res,next)=>{
            const result  = schemas.validate(req.body)
            if (result.error){
                console.log(result.error);
                req.flash('error', result.error.details);
                return res.redirect(req.baseUrl + req.url);   
            }
            if(!req.value){ req.value= {}}
            req.value['body'] = result.value;
            next()
        }
    },
    schemas:{
        addUserSchema:Joi.object().keys({
            username:Joi.string().min(3).max(30).required(),
            email:Joi.string().email().required(),
            password:Joi.string().min(3).max(30).required(),
            mobilenumber: Joi.string().min(11).max(11).pattern(new RegExp(/['0'][0-2]([0-2]|['5'])[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/)).required(),
            _csrf:Joi.string(),
            userrole:Joi.string()
        }),
        updateUserSchema:Joi.object().keys({
            username:Joi.string().min(3).max(30).required(),
            email:Joi.string().email().required(),
            mobilenumber: Joi.string().min(11).max(11).pattern(new RegExp(/['0'][0-2]([0-2]|['5'])[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/)).required(),
            _csrf:Joi.string(),
            userrole:Joi.string()
        }),
        changePasswordSchema:Joi.object().keys({
            oldpassword:Joi.string().min(3).max(30).required(),
            newpassword:Joi.string().min(3).max(30).required(),
            _csrf:Joi.string(),
        }),
        loginSchema :Joi.object().keys({
            email: Joi.string().email().required(),
            pin :Joi.string().required(),
        }) ,
        passwordScehama:Joi.object().keys({
            email: Joi.string().email().required(),
            password :Joi.string().required(),
            retypePassword :Joi.ref('password'),
        }),
        emailSchema:Joi.object().keys({
            email :Joi.string().email().required(),
        }),
        addProdSchema:Joi.object().keys({
            title:Joi.string().required(),
            code:Joi.string().required(),
            type:Joi.string().required(),
            htmlInfo:Joi.string().required(),
            htmlTable:Joi.string().required(),
            images:Joi.string().required(),
            _csrf:Joi.string(), 
        }),
        addTypeSchema:Joi.object().keys({
            name:Joi.string().required(),
            _csrf:Joi.string(), 
        }),
        addSlideSchema:Joi.object().keys({
            title:Joi.string().required(),
            subTitle:Joi.string(),
            img:Joi.string(),
            isButton:Joi.string(),
            btnText:Joi.string(),
            link:Joi.string(),
            _csrf:Joi.string(), 
        }),
        
        addbrokerSchema:Joi.object().keys({
            name:Joi.string().required(),
            mobileNo: Joi.string().min(11).max(11).pattern(new RegExp(/['0'][0-2]([0-2]|['5'])[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/)).required(),
            _csrf:Joi.string(), 
        }),
        

    }
}