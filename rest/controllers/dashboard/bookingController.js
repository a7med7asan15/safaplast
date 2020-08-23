var express = require('express');
var router = express.Router();
var csrf = require('csurf'); 
const csrfProtection = csrf();

const {

    idAdmin,
    
    sameEmail,
    
    preUsedEmail,
    
    authMiddleware } = require('../../middlewares/authenticator');
    
    
    /// Auth Use MiddleWares 
    
    
    
    router.use(   authMiddleware ,   idAdmin   );
    

    