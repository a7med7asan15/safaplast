const TypeSchema = require('../models/typeSchema');

const typeService = {

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
            const types = await TypeSchema.paginate({}, options);
            return res.render('screens/typeScreens/listAdd', {
                thisUser: req.user,
                csrfToken,
                dataProvided:types, 
                title: "أنواع المنتجات"
            })
        } catch (err) {
            console.log(err)
            res.send(err);

        }



    },

    add: async (req, res) => {



        const {
            name
        } = req.body;


        try {


            const newData = new TypeSchema({


                name



            })


            await newData.save();

            return res.redirect('/dashboard/type');

        } catch (err) {
            res.send("error")
        }





    },

    showOne: async (req, res) => {
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
            req.flash('error', 'من فضلك أعد المحاولة')
            return res.render('screens/logisticsScreens/editCityScreen', {
                thisUser: req.user,
                cityToEdit: {},
                csrfToken
            })
        }

    },

    //Update City
    update: async (req, res) => {
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
                message: 'من فضلك أعد المحاولة'
            })
            return res.redirect(`/dashboard/logistic/citys/edit/${cityId}`)
        }

    },

    //Delete City
    destroy: async (req, res) => {
        const {
            cityId
        } = req.params;
        try {
            const deleteCity = await CitySchema.findByIdAndDelete(cityId);

            req.flash('success', `${deleteCity.nameEnglish} Deleted Successfully`)
            return res.redirect(`/dashboard/logistic/citys`)
        } catch (err) {
            req.flash('error', {
                message: 'من فضلك أعد المحاولة'
            })
            return res.redirect(`/dashboard/logistic/citys`)

        }
    },

    searchShow: async (req, res) => {
        try {
            let csrfToken = req.csrfToken();
            const {
                table_search,
            } = req.body;
            const tbSearch = await CitySchema.find({
                "$or": [{
                        nameEnglish: {
                            '$regex': table_search,
                            '$options': 'i'
                        }
                    },
                    {
                        nameArabic: {
                            '$regex': table_search,
                            '$options': 'i'
                        }
                    },
                ]
            });

            return res.render('screens/logisticsScreens/cityScreens', {
                thisUser: req.user,
                csrfToken,
                table_search,
                tbSearch
            })

        } catch (err) {

            req.flash('error', 'من فضلك أعد المحاولة')
            return res.render('screens/logisticsScreens/cityScreens', {
                thisUser: req.user,
                tbSearch: {},
                table_search,
                csrfToken
            })
        }


    },
}

module.exports = typeService