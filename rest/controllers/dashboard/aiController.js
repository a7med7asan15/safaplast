// checker controller routes
var express = require('express');
var router = express.Router();
var csrf = require('csurf'); 
const csrfProtection = csrf();
const aiServices = require('../../services/aiServices');

// uploading Middleware 
// Multer Js 



// Validation Middleware 
// Joi Js
const {

validationBody, 

schemas } = require('../../helpers/validators');

// Authenticte Middlewares 
const {

idAdmin,

sameEmail,

preUsedEmail,

authMiddleware } = require('../../middlewares/authenticator');


/// Auth Use MiddleWares 



router.use(   authMiddleware ,   idAdmin   );




////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// Store READ ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////




//---------------------
// Read Store Requests 
//--------------------


router.get( '/productlists',


csrfProtection, 

aiServices.showProductSets


);

router.get( '/products',


csrfProtection, 

aiServices.getAllProducts


);

router.get( '/products/:id',


csrfProtection, 

aiServices.getProductSetProducts


);



// separate and add category 

////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// Store CREATE ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////

router.post( '/productlists',

csrfProtection, 

aiServices.addProductSet

);

router.post( '/products/:productSetId/delete',


csrfProtection, 

aiServices.deleteProductInProductSet


);


////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// EDIT Color  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////


//---------------------------
// Update Color Route 
//---------------------------


//---------------------------
// Delete Color Route 
//---------------------------



//---------------------------
// Color Search 
//---------------------------

router.post( '/productlists/delete',

csrfProtection, 

aiServices.deleteProductSet

);

router.post( '/products/delete',

csrfProtection, 

aiServices.deleteProduct

);



module.exports = router;