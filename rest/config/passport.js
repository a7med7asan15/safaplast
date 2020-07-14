const passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;

var User = require('../models/Users');
const emailmarkup = require('../helpers/emailmarkup');


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
