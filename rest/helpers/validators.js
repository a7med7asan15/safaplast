const  Joi = require('@hapi/joi');


module.exports  = {
    validationBody: (schemas)=>{
        return (req,res,next)=>{
            const result  = schemas.validate(req.body)
            if (result.error){
                req.flash('error', result.error.details)
                console.log(result.error.details)
                console.log(req.baseUrl)
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
            nameEnglish:Joi.string().required(),
            nameArabic:Joi.string().required(),
            _csrf:Joi.string(), 
        }),
        addRoomSchema:Joi.object().keys({
            nameEnglish:Joi.string().required(),
            nameArabic:Joi.string().required(),
            _csrf:Joi.string(), 
        }),
        addAmenSchema:Joi.object().keys({
            nameEnglish:Joi.string().required(),
            nameArabic:Joi.string().required(),
            icon:Joi.string().required(),
            _csrf:Joi.string(), 
        }),
        addPropSchema:Joi.object().keys({
            nameEnglish:Joi.string().required(),
            nameArabic:Joi.string().required(),
            price:Joi.string().required(),
            sku:Joi.string().required(),
            mobileNumber: Joi.string().min(11).max(11).pattern(new RegExp(/['0'][0-2]([0-2]|['5'])[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/)).required(),
            nameArea:Joi.string().required(),
            type:Joi.string().required(),
            rooms:Joi.string().required(),
            amenties:Joi.string().required(),
            images:Joi.string().required(),
            desArabic:Joi.string().required(),
            desEnglish:Joi.string().required(),
            _csrf:Joi.string(), 
        }),
        addbrokerSchema:Joi.object().keys({
            name:Joi.string().required(),
            mobileNo: Joi.string().min(11).max(11).pattern(new RegExp(/['0'][0-2]([0-2]|['5'])[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/)).required(),
            _csrf:Joi.string(), 
        }),
        

    }
}