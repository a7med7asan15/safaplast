const SizeSchema = require('../models/sizeSchema');
const _ = require('lodash');


const sizeService ={


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
            const sizes =  await SizeSchema.paginate({},options); 
            console.log(sizes);
            return res.render('screens/logisticsScreens/sizeScreens', { thisUser:req.user , csrfToken , sizes })
        }catch(err){

            res.send(err);

        }
      
    
    
    }, 
      
      




    // Add Service 
    add: async (req,res)=>{


         
        const {name}  =  req.body;
        
        
        try{
        
        
            const newSize = new SizeSchema({
        
        
                name
        
        
            })
        
        
            await newSize.save();

            return res.redirect('/dashboard/sizes') ;
            
        }catch(err){

        }





        },


}

module.exports = sizeService