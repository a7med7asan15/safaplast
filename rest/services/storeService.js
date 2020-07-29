const User = require('../models/Users');
const _ = require('lodash');
const { AreaSchema } = require('../models/citySchema');


const storeService ={
      addStorePage : async (req,res)=>{
        let csrfToken =  req.csrfToken();
        const areas = await AreaSchema.paginate();
        return res.render('screens/storeScreens/addStoreScreen', { thisUser:req.user , csrfToken, areas })
 
      }      

}

module.exports = storeService