var express     = require('express');
var path = require('path');
var bodyParser  = require('body-parser');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var homeController = require('./controllers/dashboard/homeController');
var session = require('express-session')
var MongoSeesionStore = require('connect-mongodb-session')(session);

var flash =require('connect-flash');
var {seedUser} = require('./seeds/areas')
require('./config/passport'),(passport);
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
var bodyParser = require('body-parser')

var app = express(); 

const dotenv = require("dotenv");
dotenv.config();  


require("mongodb");
require("mongodb").MongoClient;

require("./config/mongoose");

app.use('/static', express.static(path.join(__dirname, 'public')))
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
// app.use(cors());
app.use(cookieParser(process.env.JWTsecret));
const cookieExpirationDate = new Date();
const cookieExpirationDays = 365;
cookieExpirationDate.setDate(cookieExpirationDate.getDate() + cookieExpirationDays);
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())
app.use(session({
  secret:process.env.JWTsecret,
  resave:false,
  saveUninitialized:false,
  cookie: {
    httpOnly: true,
    expires: cookieExpirationDate // use expires instead of maxAge
},
  store: new MongoSeesionStore({
    uri:process.env.mongoUrl,
    collection:'sessions'
  }),
  rolling: true,
}))

app.use(flash())
app.use((req, res, next) => {
  res.locals.errors = req.flash("error");
  res.locals.successes = req.flash("success");
  next();
});
app.use(passport.initialize());
app.use(passport.session());


app.use('/dashboard', homeController);
  


seedUser()


app.listen(process.env.STATUS === "PROD" ? process.env.PORT : 3001, () => {
  console.log(`Server is running ${process.env.STATUS === "PROD" ? process.env.PORT : 3001}`);
});