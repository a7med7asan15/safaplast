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
// +++ /// Update  Product  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////

router.post( '/update',

productService.updateProduct

);





module.exports = router;