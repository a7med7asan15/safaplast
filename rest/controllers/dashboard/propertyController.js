// checker controller routes
var express = require('express');
var router = express.Router();
var csrf = require('csurf'); 
const csrfProtection = csrf();
const propertyService = require('../../services/propertyService');


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
const { schema } = require('../../models/Users');


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


propertyService.listAllStores


);
router.get( '/add',



csrfProtection, 

propertyService.addStorePage


);



////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// Store CREATE ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////

router.post( '/add',


// validationBody(schemas.addStoreSchema),

// csrfProtection, 


propertyService.createStore


);



////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// EDIT Store  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////

router.get('/edit', 


csrfProtection,

propertyService.showOne

);

//---------------------------
// Update Store Route 
//---------------------------

router.post('/edit', 

 validationBody(schemas.addStoreSchema),

csrfProtection,

propertyService.update

);


//---------------------------
// Delete Store Route 
//---------------------------

router.post('/delete/:storeId',

csrfProtection,


propertyService.destroy

); 

//---------------------------
// Store Search 
//---------------------------

router.post('/searchResult',

csrfProtection,

propertyService.searchShowStore

); 

module.exports = router;