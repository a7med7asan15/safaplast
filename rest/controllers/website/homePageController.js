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

router.get('/search', 
csrfProtection,
homePageService.showSearch

);
router.get('/faq', 
homePageService.faqPage

);
router.get('/contact', 
csrfProtection,
homePageService.contactPage

);
router.get('/yourList', 
homePageService.contactPage

);
router.post('/loadmore',
homePageService.loadMore
)

router.get('/list/:slug', 
csrfProtection,
homePageService.showOneProduct


);

router.get('/cart',
csrfProtection,
homePageService.bookingService
)

router.post( '/sendMsg',


csrfProtection, 


homePageService.sendMsg


);

//-----------------
//  Login Request 
//-----------------




module.exports = router;