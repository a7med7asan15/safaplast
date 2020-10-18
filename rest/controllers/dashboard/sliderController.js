// checker controller routes
var express = require('express');
var router = express.Router();
var csrf = require('csurf'); 
const csrfProtection = csrf();
const sliderService = require('../../services/sliderService');

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


sliderService.show


);

router.get( '/add',


csrfProtection, 


sliderService.addPage


);






// separate and add category 

////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// Store CREATE ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////



router.post( '/add',


validationBody(schemas.addSlideSchema),

csrfProtection, 


sliderService.add


);




////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// Store UPDATE ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////


//---------------------------
// Edit City Route 
//---------------------------

router.get('/edit/:dataId', 

csrfProtection,

sliderService.showOne

);



//---------------------------
// Update City Route 
//---------------------------

router.post('/edit/:dataId', 

validationBody(schemas.addSlideSchema),

csrfProtection,

sliderService.update

);


//---------------------------
// Delete City Route 
//---------------------------

router.post('/delete/:dataId',

csrfProtection,


sliderService.destroy

); 



////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// Search  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////
//---------------------------
// City Search 
//---------------------------

router.post('/searchResult',

csrfProtection,


sliderService.searchShow

); 


module.exports = router;