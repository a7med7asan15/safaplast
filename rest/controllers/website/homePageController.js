// checker controller routes
var express = require('express');
var router = express.Router();
var csrf = require('csurf'); 
const csrfProtection = csrf()
const passport = require('passport');
const homePageService = require('../../services/websiteServices/homePageService');
const ordersService = require('../../services/ordersService');

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
homePageService.contactPage

);
router.post('/loadmore',
homePageService.loadMore
)

router.get('/list/:slug', 
csrfProtection,
homePageService.showOneProduct


);

router.post('/orders/add',

csrfProtection,

validationBody(schemas.postOrder),

ordersService.addOrder

);

router.get('/orders/confirm',
ordersService.confirmOrder
)



//-----------------
//  Login Request 
//-----------------




module.exports = router;