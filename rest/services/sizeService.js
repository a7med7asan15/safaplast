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
    
    showOne: async (req, res) => {
        req.session.lastlink = req.url
        let csrfToken = req.csrfToken();

        try {
            var {sizeId} = req.params
            console.log(sizeId);
            const sizeToEdit = await SizeSchema.findById(sizeId);

            return res.render('screens/logisticsScreens/editSizeScreen', {
                thisUser: req.user,
                sizeToEdit: sizeToEdit,
                csrfToken
            })
        } catch (err) {
            req.flash('error', 'Something Went wrong')
            return res.render('screens/logisticsScreens/editSizeScreen', {
                thisUser: req.user,
                sizeToEdit: {},
                csrfToken
            })
        }

    },


    update: async (req , res )=>{
        const {sizeName} = req.body
        const {sizeId} = req.params 
        try{
            const updateSize = await SizeSchema.findById(sizeId)
            updateSize.name = sizeName,
            
            await updateSize.save();
            req.session.passedData = false 
            req.flash('success', 'Size Updated Succesfully')
            return res.redirect(`/dashboard/sizes/edit/${sizeId}`)
        }catch(err){
            req.flash('error', {message:'Something Went wrong'})
            return res.redirect(`/dashboard/sizes/edit/${sizeId}`)
        }

    },

}

module.exports = sizeService