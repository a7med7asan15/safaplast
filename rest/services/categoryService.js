const {
    TypesSchema,
    VariantsSchema,
    ClassSchema

} = require('../models/categorySchema');
const _ = require('lodash');


const categoryService = {


    // Show Types 
    showTypes: async (req, res) => {
        let page = 1;
        let limit = 1;

        if (req.query.p) {
            page = parseInt(req.query.p, 10)
        }


        let csrfToken = req.csrfToken();

        try {
            const options = {
                page,
                limit: 10,
            }
            const types = await TypesSchema.paginate({}, options);
            return res.render('screens/categoryScreens/typesScreen', {
                thisUser: req.user,
                csrfToken,
                dataProvided:types
            })
        } catch (err) {

            res.send(err);

        }



    },

    // add Type 
    addTypes: async(req,res)=>{
        const {typeEnglish,typeArabic} = req.body;
        try{
          const type = new TypesSchema({
              nameEnglish : typeEnglish,
              nameArabic: typeArabic
          })
        await type.save()
         req.flash('success', 'Type Added Succesfully')
          res.redirect('/dashboard/category/types');


        }catch(err){
            res.send(err);
        }
    },

    // Show One Type
    showOneType: async(req,res)=>{
        const id =  req.query.id;
        let csrfToken = req.csrfToken();

        try{
            const type = await TypesSchema.findById(id);
                 return res.render('screens/categoryScreens/editTypeScreen', {
                thisUser: req.user,
                dataProvided: type,
                csrfToken
            })

        }catch(err){


        }

    },

    // Update One type 
    updateOneType : async (req,res)=>{
  
            const {typeEnglish,typeArabic} = req.body;

            try{
                let type = await TypesSchema.findById(req.query.id);
                    type.nameArabic = typeArabic;
                    type.nameEnglish = typeEnglish;
                    await type.save();
                    req.flash('success', 'Type Updated Succesfully')
                    res.redirect('/dashboard/category/types');
            }catch(err){

            }
    },

    deleteOneType: async(req,res)=>{
        try{
                await TypesSchema.findByIdAndDelete(req.query.id);
                req.flash('success', 'Type Deleted Succesfully')
                res.redirect('/dashboard/category/types');
        }catch(err){
            req.flash('error', 'Cant delete it;' );
            res.redirect('/dashboard/category/types');
        }
    },
    searchShowType: async (req, res) => {
        try {
            let csrfToken = req.csrfToken();
            const {
                table_search,
            } = req.body;
            const tbSearch = await TypesSchema.find({
                "$or": [
                    { nameEnglish: { '$regex': table_search, '$options': 'i' } },
                    { nameArabic: { '$regex': table_search, '$options': 'i' } },
                ]
            });
            
            return res.render('screens/categoryScreens/typesScreen', {
                thisUser: req.user,
                csrfToken,
                table_search,
                tbSearch
            })

        } catch (err) {

            req.flash('error', 'Something Went wrong')
            return res.render('screens/categoryScreens/typesScreen', {
                thisUser: req.user,
                tbSearch: {},
                table_search,
                csrfToken
            })
        }


    },
    showClasses : async (req,res)=>{
        let page = 1;
        let limit = 1;

        if (req.query.p) {
            page = parseInt(req.query.p, 10)
        }


        let csrfToken = req.csrfToken();

        try {
            const options = {
                page,
                limit: 10,
            }
            const classes = await ClassSchema.paginate({}, options);
            return res.render('screens/categoryScreens/classScreen', {
                thisUser: req.user,
                csrfToken,
                dataProvided:classes
            })
        } catch (err) {

            res.send(err);

        }
    },
    addClass : async(req,res)=>{
        const {classEnglish ,classArabic} = req.body;
        try{
          const classadd = new ClassSchema({
              nameEnglish : classEnglish,
              nameArabic: classArabic
          })
        await classadd.save()
         req.flash('success', 'Class Added Succesfully')
          res.redirect('/dashboard/category/class');


        }catch(err){
            res.send(err);
        }
    },
    showOneClass : async (req,res)=>{
        const id =  req.query.id;
        let csrfToken = req.csrfToken();

        try{
            const Classes = await ClassSchema.findById(id);
                 return res.render('screens/categoryScreens/editClassScreen', {
                thisUser: req.user,
                dataProvided: Classes,
                csrfToken
            })

        }catch(err){


        }
    },
    updateOneClass : async (req,res)=>{

        const {classEnglish,classArabic} = req.body;

        try{
            let type = await ClassSchema.findById(req.query.id);
                type.nameArabic = classArabic;
                type.nameEnglish = classEnglish;
                await type.save();
                req.flash('success', 'Class Updated Succesfully')
                res.redirect('/dashboard/category/class');
        }catch(err){

        }
    },
    deleteOneClass: async (req,res)=>{
        try{
            await ClassSchema.findByIdAndDelete(req.query.id);
            req.flash('success', 'Class Deleted Succesfully')
            res.redirect('/dashboard/category/class');
    }catch(err){
        req.flash('error', 'Cant delete it;' );
        res.redirect('/dashboard/category/class');
    }
    },
    searchShowClass: async (req, res) => {
        try {
            let csrfToken = req.csrfToken();
            const {
                table_search,
            } = req.body;
            const tbSearch = await ClassSchema.find({
                "$or": [
                    { nameEnglish: { '$regex': table_search, '$options': 'i' } },
                    { nameArabic: { '$regex': table_search, '$options': 'i' } },
                ]
            });
            
            return res.render('screens/categoryScreens/classScreen', {
                thisUser: req.user,
                csrfToken,
                table_search,
                tbSearch
            })

        } catch (err) {

            req.flash('error', 'Something Went wrong')
            return res.render('screens/categoryScreens/classScreen', {
                thisUser: req.user,
                tbSearch: {},
                table_search,
                csrfToken
            })
        }


    },
    showVariants : async (req,res)=>{
        let page = 1;
        let limit = 1;

        if (req.query.p) {
            page = parseInt(req.query.p, 10)
        }


        let csrfToken = req.csrfToken();

        try {
            const options = {
                page,
                limit: 10,
            }
            const types = await TypesSchema.find();
            const classes = await ClassSchema.find();
            const variants = await VariantsSchema.paginate({}, options);
            return res.render('screens/categoryScreens/variationScreen', {
                thisUser: req.user,
                csrfToken,
                dataProvided:variants,
                types:types,
                classes:classes
            })
        } catch (err) {

            res.send(err);

        }  
    },
    addVariant: async ( req , res )=>{
        const {variantEnglish,variantArabic ,parentType,parentClass} = req.body;
        console.log(variantEnglish,variantArabic ,parentType,parentClass);
      try{
        const variant = new VariantsSchema({
            nameArabic:variantArabic,
            nameEnglish:variantEnglish,
            parentType:parentType,
            parenClass:parentClass
        })
        await variant.save();
        req.flash('success', 'Variant Added Succesfully')
        res.redirect('/dashboard/category/variants');

      }catch(err){



      }
    },
    searchShowVariant: async (req, res) => {
        try {
            let csrfToken = req.csrfToken();
            const {
                table_search,
            } = req.body;
            const tbSearch = await VariantsSchema.find({
                "$or": [
                    { nameEnglish: { '$regex': table_search, '$options': 'i' } },
                    { nameArabic: { '$regex': table_search, '$options': 'i' } },
                ]
            });
            
            return res.render('screens/categoryScreens/variationScreen', {
                thisUser: req.user,
                csrfToken,
                table_search,
                tbSearch
            })

        } catch (err) {

            req.flash('error', 'Something Went wrong')
            return res.render('screens/categoryScreens/variationScreen', {
                thisUser: req.user,
                tbSearch: {},
                table_search,
                csrfToken
            })
        }


    }
}

module.exports = categoryService