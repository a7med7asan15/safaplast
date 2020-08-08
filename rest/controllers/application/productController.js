// checker controller routes
var express = require('express');
var router = express.Router();
const passport = require('passport');
const productService = require('../../appServices/productService');

// uploading Middleware 
// Multer Js 

const { upload } = require('../../middlewares/uploadImage');


// Validation Middleware 
// Joi Js
const {

validationBody, 

schemas } = require('../../helpers/validators');

// Authenticte Middlewares 
const {

idAdmin,

authMiddleware } = require('../../middlewares/authenticator');


/// Auth Use MiddleWares 



router.use(   passport.authenticate('jwt', { session: false }) );




////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// Store READ ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////




//---------------------
// Read Store Requests 
//--------------------


router.get( '/',

productService.addProduct

);



// separate and add category 

////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// Store CREATE ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////


router.post( '/',

productService.addProduct


);


////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// EDIT Color  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////

// router.get('/edit/:colorId', 



// colorService.showOne

// );

// //---------------------------
// // Update Color Route 
// //---------------------------

// router.post('/edit/:colorId', 

// validationBody(schemas.addColorSchema) , 

// csrfProtection,

// colorService.update

// );


// //---------------------------
// // Delete Color Route 
// //---------------------------

// router.post('/delete/:colorId',

// csrfProtection,


// colorService.destroy

// ); 

// //---------------------------
// // Color Search 
// //---------------------------

// router.post('/searchResult',

// csrfProtection,

// colorService.searchShowColor

// ); 

module.exports = router;