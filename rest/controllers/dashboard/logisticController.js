// checker controller routes
var express = require('express');
var router = express.Router();
var csrf = require('csurf'); 
const csrfProtection = csrf();
const logisticService = require('../../services/logisticService');
const colorService = require('../../services/colorService');
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



router.get( '/citys',


csrfProtection, 


logisticService.show


);

router.get( '/areas',


csrfProtection, 


logisticService.show


);

router.get( '/colors',


csrfProtection, 


colorService.show


);

router.get( '/sizes',


csrfProtection, 


sizeService.show


);

// separate and add category 

////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// Store CREATE ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////



router.post( '/citys',


csrfProtection, 


logisticService.add


);

router.post( '/colors',


csrfProtection, 


colorService.add


);

router.post( '/sizes',


csrfProtection, 


sizeService.add


);


////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// Store UPDATE ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////




module.exports = router;