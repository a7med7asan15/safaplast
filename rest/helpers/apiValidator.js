const  Joi = require('@hapi/joi');


module.exports  = {
    validationBody: (schemas)=>{
        return (req,res,next)=>{
            const result  = schemas.validate(req.body)
            if (result.error){
                return res.json({error:true,msg:result.error.details[0].message})
            }
            if(!req.value){ req.value= {}}
            req.value['body'] = result.value;
            next()
        }
    },
    schemas:{
        loginSchema:Joi.object().keys({
            email:Joi.string().email().required(),
            password:Joi.string().required()
        }),
    }
}