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
        addClientSchema:Joi.object().keys({
            name:Joi.string().required(),
            img:Joi.string().optional().allow(''),
            _csrf:Joi.string(), 
        }),
        addCertSchema:Joi.object().keys({
            name:Joi.string().required(),
            img:Joi.string().optional().allow(''),
            _csrf:Joi.string(), 
        }),
        addSlideSchema:Joi.object().keys({
            title:Joi.string().required(),
            subTitle:Joi.string().optional().allow(''),
            img:Joi.string().optional().allow(''),
            isButton:Joi.string().optional().allow(''),
            btnText:Joi.string().optional().allow(''),
            link:Joi.string().optional().allow(''),
            _csrf:Joi.string(), 
        }),
        addNewsSchema:Joi.object().keys({
            title:Joi.string().required(),
            htmlArticle:Joi.string().required(),
            featuredImage:Joi.string().optional().allow(''),
            tag:Joi.string().required(),
            _csrf:Joi.string(), 
        }),
        addSettingSchema:Joi.object().keys({
            facebook:Joi.string().optional().allow(''),
            linkedin:Joi.string().optional().allow(''),
            instagram:Joi.string().optional().allow(''),
            logo:Joi.string().required(),
            favicon:Joi.string().required(),
            catalog:Joi.string().optional().allow(''),
            youtube:Joi.string().optional().allow(''),
            _csrf:Joi.string(), 
        }),
        
        addbrokerSchema:Joi.object().keys({
            name:Joi.string().required(),
            mobileNo: Joi.string().min(11).max(11).pattern(new RegExp(/['0'][0-2]([0-2]|['5'])[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/)).required(),
            _csrf:Joi.string(), 
        }),
        

    }
}