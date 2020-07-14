// checker controller routes
var express = require('express');
const path = require('path');
var router = express.Router();
var secret = require('../../config/secret');
var csrf = require('csurf'); 
const csrfProtection = csrf()
const passport = require('passport');
const authService = require('../../services/auth')
const userService = require('../../services/userService')
const {validationBody, schemas} = require('../../helpers/validators');

const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'rest/public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[1])
    }
  })
   
  var upload = multer({ storage: storage }); 
// Auth MiddleWares  //

const authMiddleware = (req ,res,next) => {
  if(!req.isAuthenticated())
  {
      return res.redirect('/dashboard/login')
  }
    return next()
}

const NotAuth = (req,res,next)=>{
    if(req.isAuthenticated())
    {
        return res.redirect('/dashboard')
    }
      return next()
}

const idAdmin = (req,res,next)=>{
    if(req.user.role === 0 ){

        return next();

    }
    return res.redirect('/dashboard/login')

}

// Auth Routes && Functions 


router.get('/login', NotAuth , authService.show )

router.post('/login', passport.authenticate('local',{
    successRedirect: '/dashboard',
    failureRedirect: '/dashboard/login',
    failureFlash: true
}) , authService.action )

router.post('/logout',authMiddleware, authService.destroy)


// Get Home Screeen // 

router.use(authMiddleware , idAdmin);

router.get('/', csrfProtection , userService.showAdd)
router.get('/users/add', csrfProtection, userService.showAdd )
router.post('/users/add', upload.single('avatar') , validationBody(schemas.addUserSchema) , csrfProtection ,idAdmin ,userService.create)    
router.get('/users', userService.listAll)    
router.get('/users/edit/:userId', csrfProtection,userService.showOne)    

module.exports = router;