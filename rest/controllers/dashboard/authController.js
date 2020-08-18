// checker controller routes
var express = require('express');
var router = express.Router();
var csrf = require('csurf'); 
const csrfProtection = csrf()
const passport = require('passport');
const authService = require('../../services/auth')
const propertyService = require('../../services/propertyService')

// Validation Middleware 
// Joi Js

const {
    validationBody, 
    schemas  } = require('../../helpers/validators');
    
 // Authenticte Middlewares 
 
 const {

    authMiddleware ,
   
    NotAuth   } = require('../../middlewares/authenticator');
    
    


////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// AUTH READ ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////





//-----------------
// Show Login Page 
//-----------------



router.get('/login', 

NotAuth , 

authService.show 


);



//-----------------
//  Login Request 
//-----------------


router.post('/login', 


passport.authenticate('local',{

    successRedirect: '/dashboard',

    failureRedirect: '/dashboard/login',

    failureFlash: true


}) ,

authService.action

);


//-----------------
//  Logout Request Request 
//-----------------

router.post('/logout',


authMiddleware,


authService.destroy

);



module.exports = router;