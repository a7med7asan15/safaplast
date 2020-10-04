// checker controller routes
var express = require('express');
var router = express.Router();
var csrf = require('csurf'); 
const csrfProtection = csrf();
const clientService = require('../../services/clientService');

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


clientService.show


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


clientService.add


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

clientService.showOne

);



//---------------------------
// Update City Route 
//---------------------------

router.post('/edit/:dataId', 

validationBody(schemas.addCitySchema),

csrfProtection,

clientService.update

);


//---------------------------
// Delete City Route 
//---------------------------

router.post('/delete/:dataId',

csrfProtection,


clientService.destroy

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


clientService.searchShow

); 


module.exports = router;