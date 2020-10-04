// checker controller routes
var express = require('express');
var router = express.Router();
var csrf = require('csurf'); 
const csrfProtection = csrf();
const certificateService = require('../../services/certificateService');

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


certificateService.show


);






// separate and add category 

////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// Store CREATE ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////



router.post( '/',


validationBody(schemas.addCitySchema),

csrfProtection, 


certificateService.add


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

certificateService.showOne

);



//---------------------------
// Update City Route 
//---------------------------

router.post('/edit/:dataId', 

validationBody(schemas.addCitySchema),

csrfProtection,

certificateService.update

);


//---------------------------
// Delete City Route 
//---------------------------

router.post('/delete/:dataId',

csrfProtection,


certificateService.destroy

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


certificateService.searchShow

); 


module.exports = router;