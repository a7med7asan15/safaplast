// checker controller routes
var express = require('express');
var router = express.Router();
var csrf = require('csurf');
const csrfProtection = csrf();
const productService = require('../../services/productService');


// uploading Middleware 
// Multer Js 

const {
    upload
} = require('../../middlewares/uploadImage');


// Validation Middleware 
// Joi Js
const {

    validationBody,

    schemas
} = require('../../helpers/validators');

// Authenticte Middlewares 
const {

    idAdmin,

    sameEmail,

    preUsedEmail,

    authMiddleware
} = require('../../middlewares/authenticator');
const {
    schema
} = require('../../models/Users');


/// Auth Use MiddleWares 



router.use(authMiddleware, idAdmin);




////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// ProductREAD ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////




//---------------------
// Read ProductRequests 
//--------------------



router.get('/',


    csrfProtection,


    productService.list


);

router.get('/add',


    csrfProtection,

    productService.addPage


);
// router.get( '/:dataId',


// csrfProtection, 

// productService.preview


// );



////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// ProductCREATE ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////

router.post('/add',

    validationBody(schemas.addProdSchema),

    csrfProtection,


    productService.create


);



////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// EDIT Product // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////

router.get('/edit/:dataId',


    csrfProtection,

    productService.showOne

);

//---------------------------
// Update ProductRoute 
//---------------------------

router.post('/edit',

    validationBody(schemas.addProdSchema),

    csrfProtection,

    productService.update

);


//---------------------------
// Delete ProductRoute 
//---------------------------

router.post('/delete/:dataId',

    csrfProtection,


    productService.destroy

);

//---------------------------
// ProductSearch 
//---------------------------

router.post('/searchResult',

    csrfProtection,

    productService.searchShow

);

router.get('/searchResult',

    csrfProtection,

    productService.redirectHome

);

module.exports = router;