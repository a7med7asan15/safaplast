const {CitySchema} = require('../models/citySchema');
const _ = require('lodash');


const logisticService ={


    // Show Service 
    show : async (req,res)=>{
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
              }
            const citys =  await CitySchema.paginate({},options); 
            console.log(citys);
            return res.render('screens/logisticsScreens/cityScreens', { thisUser:req.user , csrfToken , citys })
        }catch(err){

            res.send(err);

        }
      
    
    
    }, 
      
      




    // Add Service 
    add: async (req,res)=>{


         
        const {cityEnglish,cityArabic}  =  req.body;
        
        
        try{
        
        
            const newCity = new CitySchema({
        
        
                nameEnglish:cityEnglish,
        
                nameArabic:cityArabic
        
        
            })
        
        
            await newCity.save();

            return res.redirect('/dashboard/logistic/citys') ;
            
        }catch(err){

        }





        },


}

module.exports = logisticService