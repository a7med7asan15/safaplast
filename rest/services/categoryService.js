const {
    TypesSchema,
    RoomsSchema

} = require('../models/categorySchema');


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
    showRooms : async (req,res)=>{
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
            const classes = await RoomsSchema.paginate({}, options);
            return res.render('screens/categoryScreens/classScreen', {
                thisUser: req.user,
                csrfToken,
                dataProvided:classes
            })
        } catch (err) {

            res.send(err);

        }
    },
    addRoom : async(req,res)=>{
        const {classEnglish ,classArabic} = req.body;
        try{
          const classadd = new RoomsSchema({
              nameEnglish : classEnglish,
              nameArabic: classArabic
          })
        await classadd.save()
         req.flash('success', 'Room Added Succesfully')
          res.redirect('/dashboard/category/rooms');


        }catch(err){
            res.send(err);
        }
    },
    showOneRoom : async (req,res)=>{
        const id =  req.query.id;
        let csrfToken = req.csrfToken();

        try{
            const Classes = await RoomsSchema.findById(id);
                 return res.render('screens/categoryScreens/editClassScreen', {
                thisUser: req.user,
                dataProvided: Classes,
                csrfToken
            })

        }catch(err){


        }
    },
    updateOneRoom : async (req,res)=>{

        const {classEnglish,classArabic} = req.body;

        try{
            let type = await RoomsSchema.findById(req.query.id);
                type.nameArabic = classArabic;
                type.nameEnglish = classEnglish;
                await type.save();
                req.flash('success', 'Class Updated Succesfully')
                res.redirect('/dashboard/category/rooms');
        }catch(err){

        }
    },
    deleteOneRoom: async (req,res)=>{
        try{
            await RoomsSchema.findByIdAndDelete(req.query.id);
            req.flash('success', 'Room Deleted Succesfully')
            res.redirect('/dashboard/category/rooms');
    }catch(err){
        req.flash('error', 'Cant delete it;' );
        res.redirect('/dashboard/category/class');
    }
    },
    searchShowRoom: async (req, res) => {
        try {
            let csrfToken = req.csrfToken();
            const {
                table_search,
            } = req.body;
            const tbSearch = await RoomsSchema.find({
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

 }


module.exports = categoryService