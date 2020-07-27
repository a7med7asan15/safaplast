// checker controller routes
var express = require('express');
var router = express.Router();
var csrf = require('csurf'); 
const csrfProtection = csrf();
const logisticService = require('../../services/logisticService');

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



router.get( '/citys',


csrfProtection, 


logisticService.show


);

router.get( '/areas',


csrfProtection, 


logisticService.showArea


);




// separate and add category 

////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// Store CREATE ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////



router.post( '/citys',


validationBody(schemas.addCitySchema),

csrfProtection, 


logisticService.add


);

router.post( '/areas',

validationBody(schemas.addAreaSchema),

csrfProtection, 


logisticService.addArea


);


////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// Store UPDATE ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////


//---------------------------
// Edit City Route 
//---------------------------

router.get('/citys/edit/:cityId', 

csrfProtection,

logisticService.showOneCity

);

router.get('/areas/edit/:areaParentId/:areaId', 

csrfProtection,

logisticService.showOneArea

);

//---------------------------
// Update City Route 
//---------------------------

router.post('/citys/edit/:cityId', 

validationBody(schemas.updateCitySchema),

csrfProtection,

logisticService.updateCity

);


//---------------------------
// Delete City Route 
//---------------------------

router.post('/citys/delete/:cityId',

csrfProtection,


logisticService.destroyCity

); 

//---------------------------
// Update Area Route 
//---------------------------

router.post('/areas/edit/:areaId', 

csrfProtection,

logisticService.updateArea

);


//---------------------------
// Delete Area Route 
//---------------------------

router.post('/areas/delete/:areaId',

csrfProtection,


logisticService.destroyArea

); 


module.exports = router;