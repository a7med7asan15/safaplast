// checker controller routes
var express = require('express');
var router = express.Router();
var csrf = require('csurf'); 
const csrfProtection = csrf();
const colorService = require('../../services/colorService');

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


colorService.show


);



// separate and add category 

////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// Store CREATE ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////


router.post( '/',

validationBody(schemas.updateColorSchema),

csrfProtection, 


colorService.add


);


////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// EDIT Color  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////

router.get('/edit/:colorId', 


csrfProtection,

colorService.showOne

);

//---------------------------
// Update User Route 
//---------------------------

router.post('/edit/:colorId', 

validationBody(schemas.updateColorSchema) , 

csrfProtection,

colorService.update

);


module.exports = router;