// checker controller routes
var express = require('express');
var router = express.Router();
var csrf = require('csurf'); 
const csrfProtection = csrf()
const passport = require('passport');
const authService = require('../../appServices/authService')
const propertyService = require('../../services/propertyService')
const cors = require('cors')
// Validation Middleware 
// Joi Js

const {
    validationBody, 
    schemas  } = require('../../helpers/apiValidator');
    
 // Authenticte Middlewares 
 
 const {

    authMiddleware ,
   
    tokenDate 

} = require('../../middlewares/authenticator');
    
    


////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// AUTH READ ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////





//-----------------
// Show Login Page 
//-----------------



router.get('/login',

passport.authenticate('jwt', { session: false }),

tokenDate,

authService.checkToken 

);



//-----------------
//  Login Request 
//-----------------


router.post('/login',
 
validationBody(schemas.loginSchema),



authService.login
);


//-----------------
//  Logout Request Request 
//-----------------

router.post('/logout',


authMiddleware,


authService.destroy

);



module.exports = router;