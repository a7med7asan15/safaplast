const User = require('../models/Users');
const _ = require('lodash');


const storeService ={
      addStorePage : async (req,res)=>{
        let csrfToken =  req.csrfToken();
        return res.render('screens/storeScreens/addStoreScreen', { thisUser:req.user , csrfToken })
 
      }      

}

module.exports = storeService