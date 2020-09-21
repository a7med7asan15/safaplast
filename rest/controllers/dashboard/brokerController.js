// checker controller routes
var express = require('express');
var router = express.Router();
var csrf = require('csurf'); 
const csrfProtection = csrf()
const brokerService = require('../../services/brokerService')



// uploading Middleware 
// Multer Js 

const {upload}  = require('../../middlewares/uploadImage');


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

////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// broker DEPENDENT ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////


router.use( authMiddleware , idAdmin);

////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// brokerS READ ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////



//---------------------------
// Show All brokers Page 
//---------------------------


router.get('/', 

csrfProtection,

brokerService.show

);   


//---------------------------
// Show Edit broker Page 
//---------------------------



router.get('/edit', 

csrfProtection,

brokerService.showOne

);



////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// brokerS Create  ROUTES  // ++++// /////
////////////////////////////////////////////////
////////////////////////////////////////////////





//---------------------------
// Create New broker Requset 
//---------------------------


router.post('/add', 

validationBody(schemas.addbrokerSchema) , 

csrfProtection , 


brokerService.add

);    


////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// brokerS UPDATE ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////


//---------------------------
// Update broker Route 
//---------------------------

router.post('/edit', 

csrfProtection,

brokerService.update

);


//---------------------------
// broker Delete Route 
//---------------------------


router.post('/delete',


csrfProtection,

// Service  Controller 

brokerService.destroy

); 

////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// Search  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////

router.post('/searchResult',

csrfProtection,


brokerService.searchShow

); 

module.exports = router;