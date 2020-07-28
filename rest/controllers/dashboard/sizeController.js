// checker controller routes
var express = require('express');
var router = express.Router();
var csrf = require('csurf'); 
const csrfProtection = csrf();
const sizeService = require('../../services/sizeService');

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

router.get( '/',


csrfProtection, 


sizeService.show


);



// separate and add category 

////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// Store CREATE ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////




router.post( '/',


csrfProtection, 


sizeService.add


);


////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// EDIT Color  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////

router.get('/edit/:sizeId', 


csrfProtection,

sizeService.showOne

);

//---------------------------
// Update Size Route 
//---------------------------

router.post('/edit/:sizeId', 

csrfProtection,

sizeService.update

);

//---------------------------
// Delete Size Route 
//---------------------------

router.post('/delete/:sizeId',

csrfProtection,


sizeService.destroy

); 


module.exports = router;