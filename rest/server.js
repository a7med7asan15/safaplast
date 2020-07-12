var express     = require('express');
var path = require('path');
var bodyParser  = require('body-parser');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var usersController = require('./controllers/usersController');
var checkerController = require('./controllers/checkerController');
var {seedUser} = require('./seeds/areas')
require('./config/passport'),(passport);
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });

var app = express(); // Please do not remove this line, since CLI uses this line as guidance to import new controllers


const dotenv = require("dotenv");
dotenv.config();  


require("mongodb");
require("mongodb").MongoClient;
require("./config/mongoose");

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.use('/static', express.static(path.join(__dirname, 'public')))


app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/api/users', usersController);
app.use('/api/checker', checkerController);
app.use('/api/checker', checkerController);

app.get('/', function (req, res) {
res.render('screens/homeScreen', { title: 'Hey', message: 'Hello there!' })
})


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


seedUser()


app.listen(process.env.PRODUCTION === true ? process.env.PORT : 3001, () => {
  console.log(`Server is running ${process.env.PRODUCTION === true ? process.env.PORT : 3001}`);
});