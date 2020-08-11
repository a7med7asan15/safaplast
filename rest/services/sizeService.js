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
            return res.render('screens/variantScreens/sizeScreens', { thisUser:req.user , csrfToken , sizes })
        }catch(err){

            res.send(err);

        }
      
    
    
    }, 
      
      




    // Add Service 
    add: async (req,res)=>{


         
        const {nameEnglish, nameArabic}  =  req.body;
        
        
        try{
        
        
            const newSize = new SizeSchema({
        
        
                nameEnglish, 
                
                nameArabic
        
        
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
            const sizeToEdit = await SizeSchema.findById(sizeId);

            return res.render('screens/variantScreens/editSizeScreen', {
                thisUser: req.user,
                sizeToEdit: sizeToEdit,
                csrfToken
            })
        } catch (err) {
            req.flash('error', 'Something Went wrong')
            return res.render('screens/variantScreens/editSizeScreen', {
                thisUser: req.user,
                sizeToEdit: {},
                csrfToken
            })
        }

    },


    update: async (req , res )=>{
        const {nameEnglish, nameArabic} = req.body
        const {sizeId} = req.params 
        try{
            const updateSize = await SizeSchema.findById(sizeId)
            updateSize.nameEnglish = nameEnglish,
            updateSize.nameArabic = nameArabic,
            await updateSize.save();
            req.session.passedData = false 
            req.flash('success', 'Size Updated Succesfully')
            return res.redirect(`/dashboard/sizes/edit/${sizeId}`)
        }catch(err){
            req.flash('error', {message:'Something Went wrong'})
            return res.redirect(`/dashboard/sizes/edit/${sizeId}`)
        }

    },

    destroy: async (req , res )=>{
        const {sizeId} = req.params;
       try{
            const deleteSize =  await SizeSchema.findByIdAndDelete(sizeId);
            
            req.flash('success', `${deleteSize.nameEnglish} Deleted Successfully`)
            return res.redirect(`/dashboard/sizes`)
       }catch(err){
        req.flash('error', {message:'Something Went wrong'})
        return res.redirect(`/dashboard/sizes`)

       }
    },

    searchShowSize: async (req, res) => {
        try {
            let csrfToken = req.csrfToken();
            const {
                table_search,
            } = req.body;
            const tbSearch = await SizeSchema.find({
                "$or": [
                    { nameEnglish: { '$regex': table_search, '$options': 'i' } },
                    { nameArabic: { '$regex': table_search, '$options': 'i' } },
                ]
            });
        
            return res.render('screens/variantScreens/sizeScreens', {
                thisUser: req.user,
                csrfToken,
                table_search,
                tbSearch
            })

        } catch (err) {

            req.flash('error', 'Something Went wrong')
            return res.render('screens/variantScreens/sizeScreens', {
                thisUser: req.user,
                tbSearch: {},
                table_search,
                csrfToken
            })
        }


    }

}

module.exports = sizeService