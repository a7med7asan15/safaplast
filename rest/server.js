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
const  productController  =  require(  './controllers/dashboard/productController'  );
const  mediaController  =  require(  './controllers/dashboard/mediaController'  );
const  clientController  =  require(  './controllers/dashboard/clientController'  );
const  settingController  =  require(  './controllers/dashboard/settingController'  );
const  newsController  =  require(  './controllers/dashboard/newsController'  );
const  sliderController  =  require(  './controllers/dashboard/sliderController'  );
const  testimonialController  =  require(  './controllers/dashboard/testimonialController'  );
const  typeController  =  require(  './controllers/dashboard/typeController'  );
const  certificateController  =  require(  './controllers/dashboard/certificateController'  );

const  homePageController  =  require(  './controllers/website/homePageController'  );
const  contactController  =  require(  './controllers/website/contactController'  );

/// Require Seeds 

const  {  seedUser ,seedProperty ,seedOrders,seedAmenties}  =  require('./seeds/areas')


const app = express(); 




require("mongodb");


require("mongodb").MongoClient;


require("./config/mongoose");



///  Public Folders 


app.use(cors());
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

  res.locals.nameUser  =   req.flash("nameUser");

  res.locals.orderNumber   =   req.flash("orderNumber");

  res.locals.failureFlash   =   req.flash("failureFlash");

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


app.use(   '/'   ,   homePageController   );
app.use(   '/dashboard'   ,   authController   );
app.use(   '/dashboard/users'   ,   usersController   );
app.use(   '/dashboard/products'   ,  productController   );
app.use(   '/dashboard/certificates'   ,   certificateController  );
app.use(   '/dashboard/clients'   ,   clientController  );
app.use(   '/dashboard/news'   ,   newsController  );
app.use(   '/dashboard/settings'   ,   settingController  );
app.use(   '/dashboard/slider'   ,   sliderController  );
app.use(   '/dashboard/testimonials'   ,   testimonialController  );
app.use(   '/dashboard/type'   ,   typeController  );

app.use(   '/dashboard/messages'   ,   contactController  );
app.use(   '/dashboard/media'   ,   mediaController  ); 

app.get('*', function(req, res){
  return res.render('site/404.pug')
});





///////////////////////////////'
///// Seeding Db //////////////
///////////////////////////////


seedUser()


app.listen(process.env.STATUS === "PROD" ? process.env.PORT : 3001, () => {
  console.log(`Server is running ${process.env.STATUS === "PROD" ? process.env.PORT : 3001}`);
});