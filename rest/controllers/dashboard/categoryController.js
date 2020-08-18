// checker controller routes
var express = require('express');
var router = express.Router();
var csrf = require('csurf'); 
const csrfProtection = csrf();
const categoryService = require('../../services/categoryService');

// uploading Middleware 
// Multer Js a

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


router.get( '/types',


csrfProtection, 

categoryService.showTypes


);

router.get( '/types/edit',

csrfProtection, 

categoryService.showOneType


);

router.get( '/rooms',


csrfProtection, 

categoryService.showRooms


);
router.get( '/rooms/edit',


csrfProtection, 

categoryService.showOneRoom


);

// separate and add category 

////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// Store CREATE ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////

router.post( '/types/add',

validationBody(schemas.addTypeSchema),

csrfProtection, 

categoryService.addTypes

)

router.post( '/types/edit',

validationBody(schemas.addTypeSchema),

csrfProtection, 

categoryService.addTypes

)


router.post( '/rooms/add',

validationBody(schemas.addClassSchema),

csrfProtection, 

categoryService.addRoom

)
router.post( '/rooms/edit',

validationBody(schemas.addClassSchema),

csrfProtection, 

categoryService.updateOneRoom

)



////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// EDIT Color  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////

router.post( '/types/delete',

csrfProtection, 

categoryService.deleteOneType

)
router.post( '/rooms/delete',

csrfProtection, 

categoryService.deleteOneRoom

)


//---------------------------
// Update Color Route 
//---------------------------



//---------------------------
// Delete Color Route 
//---------------------------

////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// Search  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////
//---------------------------
// Types Search 
//---------------------------

router.post('/types/searchResult',

csrfProtection,


categoryService.searchShowType

); 


//---------------------------
// Class Search 
//---------------------------

router.post('/rooms/searchResult',

csrfProtection,


categoryService.searchShowRoom

); 


//---------------------------
// Variant Search 
//---------------------------


module.exports = router;