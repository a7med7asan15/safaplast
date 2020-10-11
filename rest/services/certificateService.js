const CertificateSchema = require('../models/certificateSchema');

const certificateService = {

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
            const dataProvided = await CertificateSchema.paginate({}, options);
            return res.render('screens/certificateScreens/listAdd', {
                thisUser: req.user,
                csrfToken,
                dataProvided
            })
        } catch (err) {
            console.log(err)
            res.send("error");

        }



    },

    add: async (req, res) => {



        const {
            name,
            image
        } = req.body;


        try {


            const newData = new CertificateSchema({


                name,

                image


            })


            await newData.save();

            return res.redirect('/dashboard/certificates');

        } catch (err) {
            console.log(err)
            req.flash('error', "من فضلك أعد المحاولة")
        }





    },

    showOne: async (req, res) => {
        req.session.lastlink = req.url
        let csrfToken = req.csrfToken();

        try {
            const {
                dataId
            } = req.params

            const dataProvided = await CertificateSchema.findById(dataId);

            return res.render('screens/certificateScreens/edit', {
                thisUser: req.user,
                dataProvided,
                csrfToken
            })
        } catch (err) {
            req.flash('error', 'من فضلك أعد المحاولة')
            return res.render('screens/certificateScreens/edit', {
                thisUser: req.user,
                dataProvided: {},
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
            dataId
        } = req.params
        try {
            const updateData = await CertificateSchema.findById(dataId)
            updateData.nameEnglish = nameEnglish,
                updateData.nameArabic = nameArabic,
                await updateData.save();
            req.session.passedData = false
            req.flash('success', 'تمت العملية بنجاح')
            return res.redirect(`/dashboard/certificates/edit/${dataId}`)
        } catch (err) {
            req.flash('error', 'من فضلك أعد المحاولة')
            return res.redirect(`/dashboard/certificates/edit/${dataId}`)
        }

    },

    //Delete City
    destroy: async (req, res) => {
        const {
            dataId
        } = req.params;
        try {
            const deleteData = await CertificateSchema.findByIdAndDelete(dataId);

            req.flash('success', `تم الحذف`)
            return res.redirect(`/dashboard/certificates`)
        } catch (err) {
            req.flash('error', 'من فضلك أعد المحاولة')
            return res.redirect(`/dashboard/certificates`)

        }
    },

    searchShow: async (req, res) => {
        try {
            let csrfToken = req.csrfToken();
            const {
                table_search,
            } = req.body;
            const tbSearch = await CertificateSchema.find({
                "$or": [{
                        name: {
                            '$regex': table_search,
                            '$options': 'i'
                        }
                    },
                ]
            });

            return res.render('screens/certificateScreens/listAdd', {
                thisUser: req.user,
                csrfToken,
                table_search,
                tbSearch
            })

        } catch (err) {

            req.flash('error', 'من فضلك أعد المحاولة')
            return res.render('screens/certificateScreens/listAdd', {
                thisUser: req.user,
                tbSearch: {},
                table_search,
                csrfToken
            })
        }


    },
}

module.exports = certificateService