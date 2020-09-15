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
// +++ /// Property READ ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////




//---------------------
// Read Property Requests 
//--------------------



router.get( '/',


csrfProtection, 


propertyService.listAllProps


);
router.get( '/add',


csrfProtection, 

propertyService.addPropPage


);
router.get( '/:id',


csrfProtection, 

propertyService.propertyPage


);



////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// Property CREATE ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////

router.post( '/add',

 validationBody(schemas.addPropSchema),

 csrfProtection, 


propertyService.createProp


);



////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// EDIT Property  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////

router.get('/edit', 


csrfProtection,

propertyService.showOne

);

//---------------------------
// Update Property Route 
//---------------------------

router.post('/edit', 

 validationBody(schemas.addPropSchema),

csrfProtection,

propertyService.update

);


//---------------------------
// Delete Property Route 
//---------------------------

router.post('/delete/:propId',

csrfProtection,


propertyService.destroy

); 

//---------------------------
// Property Search 
//---------------------------

router.post('/searchResult',

csrfProtection,

propertyService.searchShowProp

); 

module.exports = router;