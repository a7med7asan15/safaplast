// checker controller routes
var express = require('express');
var router = express.Router();
var csrf = require('csurf'); 
const csrfProtection = csrf()
const passport = require('passport');
const homePageService = require('../../services/websiteServices/homePageService');

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
homePageService.portPage

);
router.get('/blog', 
homePageService.blogPage

);
router.get('/certificates', 
homePageService.certPage

);
router.get('/products', 
homePageService.prodPage

);
router.get('/singleNews', 
homePageService.singleNewsPage

);
router.get('/singleProduct', 
homePageService.singleProduct

);
router.get('/contact', 
csrfProtection,
homePageService.contactPage

);

// router.get('/about-us', 
// homePageService.aboutPage

// );

router.get('/list/:slug', 
csrfProtection,
homePageService.showOneProduct


);



router.post( '/sendMsg',


csrfProtection, 


homePageService.sendMsg


);

//-----------------
//  Login Request 
//-----------------




module.exports = router;