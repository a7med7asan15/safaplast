const  express  =  require('express');
const  path  =  require('path');
const  bodyParser  =  require('body-parser');
const  cors  =  require('cors');
const  cookieParser  =  require('cookie-parser');
const  passport  =  require('passport');
const  session  =  require('express-session')
const  MongoSeesionStore  =  require('connect-mongodb-session')(session);
const  flash  =  require('connect-flash');
const  dotenv  =  require("dotenv");

var csrf = require('csurf');

csrf({ cookie: true });


/// Require Passport  

dotenv.config();  

require('./config/passport'),(passport);


/// Require Controllers 


const  usersController  =  require(  './controllers/dashboard/usersController'  );
const  authController  =  require(  './controllers/dashboard/authController'  );
const  storeController  =  require(  './controllers/dashboard/storeController'  );
const  logisticController  =  require(  './controllers/dashboard/logisticController'  );
const  colorController  =  require(  './controllers/dashboard/colorController'  );
const  sizeController  =  require(  './controllers/dashboard/sizeController'  );
const  categoryController  =  require(  './controllers/dashboard/categoryController'  );
const  aiController  =  require(  './controllers/dashboard/aiController'  );
const  appAuthController  =  require(  './controllers/application/authController'  );
const  productController  =  require(  './controllers/application/productController'  );
const  reviewController  =  require(  './controllers/dashboard/reviewController'  );
 

/// Require Seeds 

const  {  seedUser  }  =  require('./seeds/areas')


const app = express(); 




require("mongodb");


require("mongodb").MongoClient;


require("./config/mongoose");



///  Public Folders 



app.use('/static', express.static(path.join(__dirname, 'public')))


// Setting Pug As A View Engine 




app.set('views',path.join(__dirname,'views'));

app.set('view engine','pug');


app.use(  cookieParser(  process.env.JWTsecret  ));

//////////////////////////////
// Coookies Funcionality /////
//////////////////////////////



const  cookieExpirationDate  =  new Date();
const  cookieExpirationDays  =  365;
cookieExpirationDate.setDate(cookieExpirationDate.getDate() + cookieExpirationDays);



app.use(   bodyParser.urlencoded(  { extended: false }  )   ) 
app.use(   bodyParser.json()   )



//////////////////////////////
//// session Configration ////
/////////////////////////////

app.use(   '/api/auth'   ,   appAuthController  ); 
app.use(   '/api/products'   ,   productController  ); 

app.use( 
  
  session({

      secret  :  process.env.JWTsecret,


      resave  :  false,


      saveUninitialized  :  false,


      cookie  :   {


          httpOnly  : true,


          expires: cookieExpirationDate // use expires instead of maxAge

        
            },

      store  :  new MongoSeesionStore({

          uri:process.env.mongoUrl,

          collection:'sessions'
          
      }), 


      rolling  : true,


}))




////////////////////////////////////
////////////////////////////////////
///  Connect Flash configration ////
////////////////////////////////////
////////////////////////////////////




app.use(   flash()   );

app.use(
  
  (  req , res , next  ) => {

  res.locals.errors   =   req.flash("error");

  res.locals.successes   =   req.flash("success");

  next();

});



///////////////////////////////////////
/////// INITIALIZING PASSSPORT ///////
//////////////////////////////////////






app.use(   passport.initialize()   );

app.use(   passport.session()   );






/////////////////////////////////
////////// ROUTES  //////////////
////////////////////////////////



app.use(   '/dashboard'   ,   authController   );
app.use(   '/dashboard/users'   ,   usersController   );
app.use(   '/dashboard/stores'   ,   storeController   );
app.use(   '/dashboard/logistic'   ,   logisticController  );
app.use(   '/dashboard/colors'   ,   colorController  );
app.use(   '/dashboard/sizes'   ,   sizeController  ); 
app.use(   '/dashboard/category'   ,   categoryController  ); 
app.use(   '/dashboard/ai'   ,   aiController  ); 
app.use(   '/dashboard/review'   ,   reviewController  ); 




///////////////////////////////'
///// Seeding Db //////////////
///////////////////////////////


seedUser()


app.listen(process.env.STATUS === "PROD" ? process.env.PORT : 3001, () => {
  console.log(`Server is running ${process.env.STATUS === "PROD" ? process.env.PORT : 3001}`);
});