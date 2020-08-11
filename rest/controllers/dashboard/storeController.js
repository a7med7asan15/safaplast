// checker controller routes
var express = require('express');
var router = express.Router();
var csrf = require('csurf'); 
const csrfProtection = csrf();
const storeService = require('../../services/storeService');


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


storeService.listAllStores


);
router.get( '/add',


csrfProtection, 


storeService.addStorePage


);



////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// Store CREATE ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////

router.post( '/add',


validationBody(schemas.addStoreSchema),

csrfProtection, 


storeService.createStore


);



////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// EDIT Store  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////

router.get('/edit/:storeId', 


csrfProtection,

storeService.showOne

);

//---------------------------
// Update Store Route 
//---------------------------

router.post('/edit/:storeId', 

validationBody(schemas.addStoreSchema),

csrfProtection,

storeService.update

);


//---------------------------
// Delete Store Route 
//---------------------------

router.post('/delete/:storeId',

csrfProtection,


storeService.destroy

); 

//---------------------------
// Store Search 
//---------------------------

router.post('/searchResult',

csrfProtection,

storeService.searchShowStore

); 

module.exports = router;