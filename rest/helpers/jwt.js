const JWT = require('jsonwebtoken');
const secret = require('../config/secret');
module.exports = {
    signToken : user =>{
        return JWT.sign({
            iss:'maramaya',
            sub:user,
            iat:new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1 )
        } ,
        secret.JWT)
        }
}