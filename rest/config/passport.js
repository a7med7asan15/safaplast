const passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
// load up the user model
var User = require('../models/Users');
const secret = require('./secret');
// var config = require('../config/secret'); // get db config file


//json websotken Strategy 
passport.use(new JwtStrategy({
jwtFromRequest:ExtractJwt.fromHeader('authorization'),
secretOrKey :secret.JWT
} , async (payload,done)=>{
    try{
        // find the user specify to this token 
        const user = await User.findById(payload.sub)
        //if no user 
        if(!user){
            return console.log('no User')
        }
        //otherWise 
        done(null, user)
        
    }catch(err){
        done(err,false)
    }
}))

//local 

// passport.use(new localPassport({
// usernameField: 'login',
// }, async (login , password, done)=>{
// try{
// const user = await User.findOne({ email: login });

// if (!user){
//     return done(null, false,{ message: 'Incorrect username.' });
// }

// const isMatch = await user.comparePassword(password);
// //if not handle it 
// if(!isMatch){
//     return done(null,false,{ message: 'Incorrect Password.' });
// }
// return done(null, user)
// }catch(error){
// done(error,false,{ message: 'Incorrect username.' })
// }

// }))