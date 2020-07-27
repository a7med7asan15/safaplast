const  Joi = require('@hapi/joi');


module.exports  = {
    validationBody: (schemas)=>{
        return (req,res,next)=>{
            console.log(req.url);
            const result  = schemas.validate(req.body)
            if (result.error){
                req.flash('error', result.error.details)
                return res.redirect(req.baseUrl + req.url)
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
        addColorSchema:Joi.object().keys({
            colorName:Joi.string().min(3).max(30).required(),
            colorHex:Joi.string().min(4).max(7).required(),
            _csrf:Joi.string(), 
        }),
        updateColorSchema:Joi.object().keys({
            colorName:Joi.string().min(3).max(30).required(),
            colorHex:Joi.string().min(4).max(7).required(),
            _csrf:Joi.string(), 
        }),
        addAreaSchema:Joi.object().keys({
            areaEnglish:Joi.string().required(),
            areaArabic:Joi.string().required(),
            parentCity:Joi.string().required(),
            _csrf:Joi.string(), 
        }),
        updateCitySchema:Joi.object().keys({
            nameEnglish:Joi.string().required(),
            nameArabic:Joi.string().required(),
            parent:Joi.string().required(),
            _csrf:Joi.string(), 
        }),
        addCitySchema:Joi.object().keys({
            nameEnglish:Joi.string().required(),
            nameArabic:Joi.string().required(),
            parent:Joi.string().required(),
            _csrf:Joi.string(), 
        }),
        updateAreaSchema:Joi.object().keys({
            nameEnglish:Joi.string().required(),
            nameArabic:Joi.string().required(),
            parent:Joi.string().required(),
            _csrf:Joi.string(), 
        }),

    }
}