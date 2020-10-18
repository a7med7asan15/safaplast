// checker controller routes
var express = require('express');
var router = express.Router();
var csrf = require('csurf'); 
const csrfProtection = csrf()
const passport = require('passport');
const homePageService = require('../../services/websiteServices/homePageService');
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


router.get('/portfolio', 
csrfProtection,
newsService.portPage

);

router.get('/certificates', 
csrfProtection,
homePageService.certPage

);



router.get('/contact', 
csrfProtection,
homePageService.contactPage

);





router.post( '/sendMsg',


csrfProtection, 


homePageService.sendMsg


);

router.post( '/downloadCatalog',


csrfProtection, 


homePageService.downloadCatalog


);



//-----------------
//  Login Request 
//-----------------




module.exports = router;