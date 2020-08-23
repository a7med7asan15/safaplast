const  Joi = require('@hapi/joi');


module.exports  = {
    validationBody: (schemas)=>{
        return (req,res,next)=>{
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
            colorArabic:Joi.string().min(3).max(30).required(),
            _csrf:Joi.string(), 
        }),
        addAreaSchema:Joi.object().keys({
            nameEnglish:Joi.string().required(),
            nameArabic:Joi.string().required(),
            parentCity:Joi.string().required(),
            _csrf:Joi.string(), 
        }),
        addCitySchema:Joi.object().keys({
            nameEnglish:Joi.string().required(),
            nameArabic:Joi.string().required(),
            _csrf:Joi.string(), 
        }),
        addTypeSchema:Joi.object().keys({
            typeEnglish:Joi.string().required(),
            typeArabic:Joi.string().required(),
            _csrf:Joi.string(), 
        }),
        addClassSchema:Joi.object().keys({
            classEnglish:Joi.string().required(),
            classArabic:Joi.string().required(),
            _csrf:Joi.string(), 
        }),
        addVariantSchema:Joi.object().keys({
            variantEnglish:Joi.string().required(),
            variantArabic:Joi.string().required(),
            parentType:Joi.string().required(),
            parentClass:Joi.string().required(),
            _csrf:Joi.string(), 
        }),
        addStoreSchema:Joi.object().keys({
            storeEnglish:Joi.string().required(),
            storeArabic:Joi.string().required(),
            mobileNumber: Joi.string().min(11).max(11).pattern(new RegExp(/['0'][0-2]([0-2]|['5'])[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/)).required(),
            storeOwner:Joi.string().required(),
            storeArea:Joi.string().required(),
            addressArabic:Joi.string().required(),
            addressEnglish:Joi.string().required(),
            longtude:Joi.string().required(),
            latitude:Joi.string().required(),
            _csrf:Joi.string(), 
        }),
        

    }
}