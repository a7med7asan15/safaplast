// checker controller routes
var express = require('express');
var router = express.Router();
var csrf = require('csurf'); 
const csrfProtection = csrf()
const passport = require('passport');
const productService = require('../../services/websiteServices/productService');

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
productService.prodPage

);

router.get('/:slug',
csrfProtection, 
productService.singleProduct

);

module.exports = router;