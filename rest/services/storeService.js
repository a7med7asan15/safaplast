const User = require('../models/Users');
const { AreaSchema } = require('../models/citySchema');
const StoreSchema = require('../models/storeSchema');


const storeService ={
      listAllStores:async(req,res)=>{
        let page = 1; 
        let limit = 1;

        if (req.query.p){
            page = parseInt(req.query.p,10)
        }

        let csrfToken =  req.csrfToken();
        try{
          const options = {
            page,
            limit: 10,
            populate:'storeOwner'
            
          }
        const stores =  await StoreSchema.paginate({},options); 
        console.log(stores.docs)
        return res.render('screens/storeScreens/listAllStores', { thisUser:req.user , csrfToken , stores })

        }catch(err){
          res.send('error')
        }
          
        },
      addStorePage : async (req,res)=>{
        let csrfToken =  req.csrfToken();
        const areas = await AreaSchema.paginate();
        return res.render('screens/storeScreens/addStoreScreen', { thisUser:req.user , csrfToken, areas })
 
      } ,
      createStore : async (req,res)=>{
       const { storeEnglish,
        storeArabic,
        mobileNumber,
        storeOwner,
        storeArea,
        addressArabic,
        addressEnglish,
        longtude,
        latitude} = req.body;

          try{
             const areaObj =  await AreaSchema.findById(storeArea);
              console.log(areaObj);
            const store = new StoreSchema({
              storeOwner,
              storeEnglish,
              storeArabic,
              mobileNumber,
              Address:{
                cityId:areaObj.parent,
                areaId:areaObj.id,
                addressArabic,
                addressEnglish,
                longtude,
                latitude
              }
            });
            await store.save();
            req.flash('success', 'Store Added Succesfully')
            return res.redirect('/dashboard/stores');

          }catch(err){


          }
      }   

}

module.exports = storeService