const passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;
var User = require('../models/Users');
// const emailmarkup = require('../helpers/emailmarkup');
var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;


passport.use(new LocalStrategy(
    {  usernameField: 'email',
    passwordField: 'password'},
    function(email, password, done) {
      User.findOne({ email: email }, async (err, user) =>{
          
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
       var compare = await user.comparePassword(password)
        if (!compare) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
     

    }
    
  ));
  passport.serializeUser(function(user, done) {
     
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {

      done(err, user);
    });
  });

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWTsecret;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {


  User.findById(jwt_payload.user.id, function(err, user) {


      if (err) {

          return done(err, false);
      }
      if (user) {
        user.endDate = jwt_payload.user.endDate;
        return done(null, user);
      } else {
          return done(null, false);
          // or you could create a new account
      }
  });
}));
  