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
            nameEnglish,
            nameArabic
        } = req.body;


        try {


            const newCity = new CitySchema({


                nameEnglish,

                nameArabic


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
            var {
                cityId
            } = req.params

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
            nameEnglish,
            nameArabic
        } = req.body
        const {
            cityId
        } = req.params
        try {
            const updateCity = await CitySchema.findById(cityId)
            updateCity.nameEnglish = nameEnglish,
                updateCity.nameArabic = nameArabic,
                await updateCity.save();
            req.session.passedData = false
            req.flash('success', 'City Updated Succesfully')
            return res.redirect(`/dashboard/logistic/citys/edit/${cityId}`)
        } catch (err) {
            req.flash('error', {
                message: 'Something Went wrong'
            })
            return res.redirect(`/dashboard/logistic/citys/edit/${cityId}`)
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
            return res.redirect(`/dashboard/logistic/citys`)
        } catch (err) {
            req.flash('error', {
                message: 'Something Went wrong'
            })
            return res.redirect(`/dashboard/logistic/citys`)

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
                populate: 'parent',
            }
            const areas = await AreaSchema.paginate({}, options);
            const citys = await CitySchema.paginate();
            console.log(areas);
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
            nameEnglish,
            nameArabic,
            parentCity
        } = req.body;

        try {

            const newArea = new AreaSchema({

                nameEnglish: nameEnglish,

                nameArabic: nameArabic,

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
            var {
                areaId
            } = req.params
            const options = {
                populate: 'parent',
            }
            const citys = await CitySchema.paginate();
            const areaToEdit = await AreaSchema.findById(areaId).populate('parent');
            console.log(areaToEdit);
            return res.render('screens/logisticsScreens/editAreaScreen', {
                thisUser: req.user,
                areaToEdit: areaToEdit,
                citys: citys,
                csrfToken
            })
        } catch (err) {
            req.flash('error', 'Something Went wrong')
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
            nameEnglish,
            nameArabic,
            parentCity
        } = req.body
        const {
            areaId
        } = req.params
        try {
            const updateArea = await AreaSchema.findById(areaId);
            updateArea.nameEnglish = nameEnglish,
                updateArea.nameArabic = nameArabic,
                updateArea.parent = parentCity,
                await updateArea.save();

            req.session.passedData = false
            req.flash('success', 'Area Updated Succesfully')
            return res.redirect(`/dashboard/logistic/areas/edit/${areaId}`)
        } catch (err) {
            req.flash('error', {
                message: 'Something Went wrong'
            })
            return res.redirect(`/dashboard/logistic/areas/edit/${areaId}`)
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

    searchArea: async (req, res) => {
        try {

            const area = await AreaSchema.find(

                {
                    nameEnglish: {
                        $regex: req.body.nameEnglish
                    }

                }, 'nameEnglish');

            return res.send({
                results: area
            })

        } catch (err) {

            return res.send(err);
        }


    }


}

module.exports = logisticService