// checker controller routes
var express = require('express');
var router = express.Router();
var csrf = require('csurf'); 
const csrfProtection = csrf()
const userService = require('../../services/userService')



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
// +++ /// USER DEPENDENT ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////

router.post('/search',


csrfProtection,

userService.searchUser

)




router.use( authMiddleware , idAdmin);

////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// USERS READ ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////



//---------------------------
// Show Add User Page 
//---------------------------




router.get('/add', 


csrfProtection,

userService.showAdd 


);


//---------------------------
// Show All Users Page 
//---------------------------


router.get('/', 

csrfProtection,

userService.listAll

);   


//---------------------------
// Show Edit user Page 
//---------------------------



router.get('/edit/:userId', 

csrfProtection,

userService.showOne

);

//---------------------------
// show change Password Page 
//---------------------------
router.get('/edit/:userId/changepassword', 


csrfProtection,  

userService.showPassword

);





////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// USERS Create  ROUTES  // ++++// /////
////////////////////////////////////////////////
////////////////////////////////////////////////





//---------------------------
// Create New User Requset 
//---------------------------


router.post('/add', 

upload.single('avatar') ,

validationBody(schemas.addUserSchema) , 

csrfProtection , 

idAdmin ,

preUsedEmail , 

userService.create

);    


////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// USERS UPDATE ROUTES  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////


//---------------------------
// Update User Route 
//---------------------------

router.post('/edit/:userId', 

upload.single('avatar') ,

validationBody(schemas.updateUserSchema) , 

csrfProtection,

idAdmin, 

sameEmail,

userService.update

);



//---------------------------
// Update Password Route 
//---------------------------


router.post('/edit/:userId/changepassword',


validationBody(schemas.changePasswordSchema),

csrfProtection,

userService.changePassword

);

// USERS DELETE ROUTES  // 


//---------------------------
// User Delete Route 
//---------------------------


router.post('/delete/:userId',


idAdmin,


csrfProtection,

// Service  Controller 

userService.destroy

); 

////////////////////////////////////////////////
////////////////////////////////////////////////
// +++ /// Search  // ++++// //////
////////////////////////////////////////////////
////////////////////////////////////////////////

router.post('/searchResult',

csrfProtection,


userService.searchShowUser

); 

module.exports = router;