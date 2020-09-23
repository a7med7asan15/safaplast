// checker controller routes
var express = require('express');
var router = express.Router();
var csrf = require('csurf'); 
var request = require('request');

const csrfProtection = csrf();
const contactService = require('../../services/websiteServices/contactService');

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


contactService.show


);

router.get( '/inactive',


csrfProtection, 


contactService.showOld


);

router.get( '/inactivate',


csrfProtection, 


contactService.delete


);



module.exports = router;