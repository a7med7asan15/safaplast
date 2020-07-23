const ColorSchema = require('../models/colorSchema');
const _ = require('lodash');


const colorService ={


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
            const colors =  await ColorSchema.paginate({},options); 
            console.log(colors);
            return res.render('screens/logisticsScreens/colorScreens', { thisUser:req.user , csrfToken , colors })
        }catch(err){

            res.send(err);

        }
      
    
    
    }, 
      
      




    // Add Service 
    add: async (req,res)=>{


         
        const {colorName,colorHex}  =  req.body;
        
        
        try{
        
        
            const newColor = new ColorSchema({
        
        
                name: colorName,
        
                colorHex
        
        
            })
        
        
            await newColor.save();

            return res.redirect('/dashboard/logistic/colors') ;
            
        }catch(err){

        }





        },


}

module.exports = colorService