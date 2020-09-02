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
        const {nameEnglish,nameArabic} = req.body;
        try{
          const type = new TypesSchema({
              nameEnglish : nameEnglish,
              nameArabic: nameArabic
          })
        await type.save()
         req.flash('success', 'Type Added Succesfully')
          res.redirect('/dashboard/category/types');


        }catch(err){
            req.flash('error', 'Type not Added')
            res.redirect('/dashboard/category/types');
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
  
            const {nameEnglish,nameArabic} = req.body;

            try{
                let type = await TypesSchema.findById(req.query.id);
                    type.nameArabic = nameArabic;
                    type.nameEnglish = nameEnglish;
                    await type.save();
                    req.flash('success', 'Type Updated Succesfully')
                    res.redirect('/dashboard/category/types');
            }catch(err){
                req.flash('success', 'Type not Updated')
                res.redirect('/dashboard/category/types');
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
            const rooms = await RoomsSchema.paginate({}, options);
            return res.render('screens/categoryScreens/roomScreen', {
                thisUser: req.user,
                csrfToken,
                dataProvided:rooms
            })
        } catch (err) {

            res.send(err);

        }
    },
    addRoom : async(req,res)=>{
        const {nameEnglish ,nameArabic} = req.body;
        try{
          const roomadd = new RoomsSchema({
              nameEnglish,
              nameArabic
          })
        await roomadd.save()
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
            const rooms = await RoomsSchema.findById(id);
                 return res.render('screens/categoryScreens/editRoomScreen', {
                thisUser: req.user,
                dataProvided: rooms,
                csrfToken
            })

        }catch(err){


        }
    },
    updateOneRoom : async (req,res)=>{

        const {nameEnglish,nameArabic} = req.body;

        try{
            let room = await RoomsSchema.findById(req.query.id);
                room.nameArabic = nameArabic;
                room.nameEnglish = nameEnglish;
                await room.save();
                req.flash('success', 'Room Updated Succesfully')
                res.redirect('/dashboard/category/rooms');
        }catch(err){
            req.flash('error', 'Room not updated' );
            res.redirect('/dashboard/category/rooms');
        }
    },
    deleteOneRoom: async (req,res)=>{
        try{
            await RoomsSchema.findByIdAndDelete(req.query.id);
            req.flash('success', 'Room Deleted Succesfully')
            res.redirect('/dashboard/category/rooms');
    }catch(err){
        req.flash('error', 'Cant delete it;' );
        res.redirect('/dashboard/category/rooms');
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
            
            return res.render('screens/categoryScreens/roomScreen', {
                thisUser: req.user,
                csrfToken,
                table_search,
                tbSearch
            })

        } catch (err) {

            req.flash('error', 'Something Went wrong')
            return res.render('screens/categoryScreens/roomScreen', {
                thisUser: req.user,
                tbSearch: {},
                table_search,
                csrfToken
            })
        }


    },

 }


module.exports = categoryService