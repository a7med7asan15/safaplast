// checker controller routes
var express = require('express');
var router = express.Router();
var csrf = require('csurf'); 
const csrfProtection = csrf()
const passport = require('passport');
const homePageService = require('../../services/websiteServices/homePageService')

// Validation Middleware 
// Joi Js

const {
    validationBody, 
    schemas  } = require('../../helpers/validators');
    
 // Authenticte Middlewares 
 
 const {

    authMiddleware ,
   
    NotAuth   } = require('../../middlewares/authenticator');
    
    


////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// AUTH READ ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////





//-----------------
// Website Home Page 
//-----------------



router.get('/', 
csrfProtection,
homePageService.show 


);
router.get('/search', 
csrfProtection,
homePageService.showSearch


);
router.get('/list/:slug', 
homePageService.showOneProduct


);



//-----------------
//  Login Request 
//-----------------




module.exports = router;