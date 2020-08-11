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
            return res.render('screens/variantScreens/colorScreens', {
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
            colorHex,
            colorArabic,
        } = req.body;

        var keepValue;

        try {


            const newColor = new ColorSchema({


                name: colorName,

                colorHex,

                colorArabic


            })


            await newColor.save();

            return res.redirect('/dashboard/colors');

        } catch (err) {
            keepValue = 2;
            req.flash('error', 'Something Went wrong');
            console.log(keepValue);
            return res.render('screens/variantScreens/colorScreens', {
                thisUser: req.user,
                csrfToken,
                keepValue,
                colorName,

                colorHex,

                colorArabic
            })
        }





    },

    showOne: async (req, res) => {
        req.session.lastlink = req.url
        let csrfToken = req.csrfToken();

        try {
            var {
                colorId
            } = req.params

            const colorToEdit = await ColorSchema.findById(colorId);

            return res.render('screens/variantScreens/editColorScreen', {
                thisUser: req.user,
                colorToEdit: colorToEdit,
                csrfToken
            })
        } catch (err) {
            req.flash('error', 'Something Went wrong')
            return res.render('screens/variantScreens/editColorScreen', {
                thisUser: req.user,
                colorToEdit: {},
                csrfToken
            })
        }

    },


    update: async (req, res) => {
        const {
            colorName,
            colorHex
        } = req.body
        const {
            colorId
        } = req.params
        try {
            const updateColor = await ColorSchema.findById(colorId)
            updateColor.name = colorName,
                updateColor.colorHex = colorHex,
                updateColor.colorArabic = colorArabic,
                await updateColor.save();
            req.session.passedData = false
            req.flash('success', 'Color Updated Succesfully')
            return res.redirect(`/dashboard/colors/edit/${colorId}`)
        } catch (err) {
            req.flash('error', {
                message: 'Something Went wrong'
            })
            return res.redirect(`/dashboard/colors/edit/${colorId}`)
        }

    },

    destroy: async (req, res) => {
        const {
            colorId
        } = req.params;
        try {
            const deleteColor = await ColorSchema.findByIdAndDelete(colorId);

            req.flash('success', `${deleteColor.name} Deleted Successfully`)
            return res.redirect(`/dashboard/colors`)
        } catch (err) {
            req.flash('error', {
                message: 'Something Went wrong'
            })
            return res.redirect(`/dashboard/colors`)

        }
    },

    searchShowColor: async (req, res) => {
        try {
            let csrfToken = req.csrfToken();
            const {
                table_search,
            } = req.body;
            const tbSearch = await ColorSchema.find({
                "$or": [
                    { name: { '$regex': table_search, '$options': 'i' } },
                    { colorHex: { '$regex': table_search, '$options': 'i' } },
                    { colorArabic: { '$regex': table_search, '$options': 'i' } }
                ]
            });
            return res.render('screens/variantScreens/colorScreens', {
                thisUser: req.user,
                csrfToken,
                table_search,
                tbSearch
            })

        } catch (err) {

            req.flash('error', 'Something Went wrong')
            return res.render('screens/variantScreens/colorScreens', {
                thisUser: req.user,
                table_search,
                tbSearch:{},
                csrfToken
            })
        }


    }


}

module.exports = colorService