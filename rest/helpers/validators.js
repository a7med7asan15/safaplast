const  Joi = require('@hapi/joi');


module.exports  = {
    validationBody: (schemas)=>{
        return (req,res,next)=>{
            const result  = schemas.validate(req.body)
            if (result.error){
                return res.status(200).json({er:true, no:1, message:'validation Error',validationEr:result,token:'' })
            }
            if(!req.value){ req.value= {}}
            req.value['body'] = result.value;
            next()
        }
    },
    schemas:{
        registerSchema:Joi.object().keys({
            firstname:Joi.string().min(3).max(30).required(),
            lastname:Joi.string().min(3).max(30).required(),
            mobileNo: Joi.string().min(11).max(11).pattern(new RegExp(/['0'][0-2]([0-2]|['5'])[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/)).required(),
            natId: Joi.string().min(14).max(14).required(),
            pin :Joi.string().min(4).required(),
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
        })

    }
}