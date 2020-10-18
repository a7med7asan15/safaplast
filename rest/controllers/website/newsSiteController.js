// checker controller routes
var express = require('express');
var router = express.Router();
var csrf = require('csurf'); 
const csrfProtection = csrf()
const passport = require('passport');
const newsService = require('../../services/websiteServices/newsService');

// Validation Middleware 
// Joi Js


const {
    validationBody, 
    schemas  } = require('../../helpers/apiValidator');
    
 // Authenticte Middlewares 
 
 const {

    authMiddleware ,
   
    NotAuth   } = require('../../middlewares/authenticator');


router.get('/', 
csrfProtection,
newsService.blogPage

);

router.get('/:slug',
csrfProtection, 
newsService.singleNews

);

module.exports = router;