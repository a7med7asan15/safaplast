// users controller routes
var express = require('express');
var router = express.Router();
const authService = require('../services/auth');
const {validationBody, schemas} = require('../helpers/validators');
const passport = require('passport');
const natId = require('../middlewares/natIdMiddleware');
const mobileAvail = require('../middlewares/checkMobileNo');
const natIdAvail = require('../middlewares/checkNatId'); 
const userCrud = require('../services/user.crud');


// get /api/users/
router.get('/',(req,res) => {
  res.send('GET response');
});

// Register New User
// router.post('/', validationBody(schemas.registerSchema) ,authService.signUp);

// Login
router.post('/register',validationBody(schemas.registerSchema),natId,mobileAvail,natIdAvail,authService.register)
router.post('/login', validationBody(schemas.loginSchema),authService.login);
router.post('/resetpassword', validationBody(schemas.emailSchema),authService.resetPassword);
router.post('/setresetpassword', validationBody(schemas.passwordScehama),passport.authenticate('jwt', {session: false}),authService.setresetpassword);



// put /api/users/
router.get('/profiledata', passport.authenticate('jwt', {session: false}), userCrud.getUserProfileData);

// delete /api/users/
router.delete('/',(req,res) => {
  res.send('DELETE response');
});

module.exports = router;