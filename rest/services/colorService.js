const ColorSchema = require('../models/colorSchema');
const _ = require('lodash');


const colorService = {


    // Show Service 
    show: async (req, res) => {
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
            const colors = await ColorSchema.paginate({}, options);
            console.log(colors);
            return res.render('screens/logisticsScreens/colorScreens', {
                thisUser: req.user,
                csrfToken,
                colors
            })
        } catch (err) {

            res.send(err);

        }



    },






    // Add Service 
    add: async (req, res) => {



        const {
            colorName,
            colorHex
        } = req.body;


        try {


            const newColor = new ColorSchema({


                name: colorName,

                colorHex


            })


            await newColor.save();

            return res.redirect('/dashboard/colors');

        } catch (err) {

        }





    },

    showOne: async (req, res) => {
        req.session.lastlink = req.url
        let csrfToken = req.csrfToken();

        try {
            var {colorId} = req.params
            console.log(colorId);
            const colorToEdit = await ColorSchema.findById(colorId);

            return res.render('screens/logisticsScreens/editColorScreen', {
                thisUser: req.user,
                colorToEdit: colorToEdit,
                csrfToken
            })
        } catch (err) {
            req.flash('error', 'Something Went wrong')
            return res.render('screens/logisticsScreens/editColorScreen', {
                thisUser: req.user,
                colorToEdit: {},
                csrfToken
            })
        }

    },


    update: async (req , res )=>{
        const {colorName, colorHex} = req.body
        const {colorId} = req.params 
        try{
            const updateColor = await ColorSchema.findById(colorId)
            updateColor.name = colorName,
            updateColor.colorHex = colorHex,
            await updateColor.save();
            req.session.passedData = false 
            req.flash('success', 'Color Updated Succesfully')
            return res.redirect(`/dashboard/colors/edit/${colorId}`)
        }catch(err){
            req.flash('error', {message:'Something Went wrong'})
           return res.redirect(`/dashboard/colors/edit/${colorId}`)
        }

    },

}

module.exports = colorService