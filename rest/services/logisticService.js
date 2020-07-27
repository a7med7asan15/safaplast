const {
    CitySchema,
    AreaSchema
} = require('../models/citySchema');
const _ = require('lodash');


const logisticService = {


    // Show Cities 
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
            const citys = await CitySchema.paginate({}, options);
            return res.render('screens/logisticsScreens/cityScreens', {
                thisUser: req.user,
                csrfToken,
                citys
            })
        } catch (err) {

            res.send(err);

        }



    },

    // Add City 
    add: async (req, res) => {



        const {
            cityEnglish,
            cityArabic
        } = req.body;


        try {


            const newCity = new CitySchema({


                nameEnglish: cityEnglish,

                nameArabic: cityArabic


            })


            await newCity.save();

            return res.redirect('/dashboard/logistic/citys');

        } catch (err) {

        }





    },

    //Edit City
    showOneCity: async (req, res) => {
        req.session.lastlink = req.url
        let csrfToken = req.csrfToken();

        try {
            var {cityId} = req.params
            
            const cityToEdit = await CitySchema.findById(cityId);

            return res.render('screens/logisticsScreens/editCityScreen', {
                thisUser: req.user,
                cityToEdit: cityToEdit,
                csrfToken
            })
        } catch (err) {
            req.flash('error', 'Something Went wrong')
            return res.render('screens/logisticsScreens/editCityScreen', {
                thisUser: req.user,
                cityToEdit: {},
                csrfToken
            })
        }

    },

    //Update City
    updateCity: async (req, res) => {
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

    //Delete City
    destroyCity: async (req, res) => {
        const {
            cityId
        } = req.params;
        try {
            const deleteCity = await CitySchema.findByIdAndDelete(cityId);

            req.flash('success', `${deleteCity.nameEnglish} Deleted Successfully`)
            return res.redirect(`/dashboard/citys`)
        } catch (err) {
            req.flash('error', {
                message: 'Something Went wrong'
            })
            return res.redirect(`/dashboard/citys`)

        }
    },
    // Show areas
    showArea: async (req, res) => {
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
            const areas = await AreaSchema.paginate({}, options);
            const citys = await CitySchema.paginate({}, options);
            return res.render('screens/logisticsScreens/areaScreens', {
                thisUser: req.user,
                csrfToken,
                areas,
                citys
            })
        } catch (err) {

            res.send(err);

        }



    },

    //Add Area
    addArea: async (req, res) => {



        const {
            areaEnglish,
            areaArabic,
            parentCity
        } = req.body;


        try {


            const newArea = new AreaSchema({


                nameEnglish: areaEnglish,

                nameArabic: areaArabic,

                parent: parentCity,

            })


            await newArea.save();

            return res.redirect('/dashboard/logistic/areas');

        } catch (err) {

        }





    },

    //Edit Area
    showOneArea: async (req, res) => {
        req.session.lastlink = req.url
        let csrfToken = req.csrfToken();

        try {
            var {areaId} = req.params
            const areaToEdit = await AreaSchema.findById(areaId);
            const citys = await CitySchema.paginate({}, options);
            console.log(areaToEdit);
            console.log(3);
            return res.render('screens/logisticsScreens/editAreaScreen', {
                thisUser: req.user,
                areaToEdit: areaToEdit,
                citys: citys,
                csrfToken
            })
        } catch (err) {
            req.flash('error', 'Something Went wrong')
            console.log(3);
            return res.render('screens/logisticsScreens/editAreaScreen', {
                thisUser: req.user,
                areaToEdit: {},
                citys: {},
                csrfToken
            })
        }

    },


    //Edit Area
    updateArea: async (req, res) => {
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

    //Delete Area
    destroyArea: async (req, res) => {
        const {
            areaId
        } = req.params;
        try {
            const deleteArea = await AreaSchema.findByIdAndDelete(areaId);

            req.flash('success', `${deleteArea.nameEnglish} Deleted Successfully`)
            return res.redirect(`/dashboard/logistic/areas`)
        } catch (err) {
            req.flash('error', {
                message: 'Something Went wrong'
            })
            return res.redirect(`/dashboard/logistic/areas`)

        }
    },



}

module.exports = logisticService