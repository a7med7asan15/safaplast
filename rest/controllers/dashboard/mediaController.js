// checker controller routes
var express = require('express');
var router = express.Router();
var csrf = require('csurf'); 
const csrfProtection = csrf();
const mediaService = require('../../services/mediaService');

// uploading Middleware 
// Multer Js 

const upload = require('../../middlewares/uploadImage');


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



// router.use(   authMiddleware ,   idAdmin   );




////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// Store READ ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////


router.get( '/upload ',

upload.none(),

// csrfProtection, 


mediaService.uploadImageFiles


);

//---------------------
// Read Store Requests 
//--------------------


router.post( '/uploadimage',

upload.any(),

csrfProtection, 

mediaService.uploadImageFiles


);

router.post('/deleteimage',
csrfProtection,
mediaService.deleteImage
)


module.exports = router;