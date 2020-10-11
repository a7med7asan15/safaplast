const TestimonialSchema = require('../models/testimonialSchema');

const testimonialService = {

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
            const dataProvided = await TestimonialSchema.paginate({}, options);
            return res.render('screens/testimonialScreens/listAll', {
                thisUser: req.user,
                csrfToken,
                dataProvided
            })
        } catch (err) {

            console.log(err);
res.send("error");

        }



    },

    add: async (req, res) => {



        const {
            nameEnglish,
            nameArabic
        } = req.body;


        try {


            const newData = new TestimonialSchema({


                nameEnglish,

                nameArabic


            })


            await newData.save();

            return res.redirect('/dashboard/testimonial');

        } catch (err) {

            console.log(err);
            res.send("error");

        }





    },

    showOne: async (req, res) => {
        req.session.lastlink = req.url
        let csrfToken = req.csrfToken();

        try {
            const {
                dataId
            } = req.params

            const dataProvided = await TestimonialSchema.findById(dataId);

            return res.render('screens/testimonialScreens/edit', {
                thisUser: req.user,
                dataProvided,
                csrfToken
            })
        } catch (err) {
            req.flash('error', 'من فضلك أعد المحاولة')
            return res.render('screens/testimonialScreens/edit', {
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
            const updateData = await TestimonialSchema.findById(dataId)
            updateData.nameEnglish = nameEnglish,
                updateData.nameArabic = nameArabic,
                await updateData.save();
            req.session.passedData = false
            req.flash('success', 'تمت العملية بنجاح')
            return res.redirect(`/dashboard/testimonial/edit/${dataId}`)
        } catch (err) {
            req.flash('error', 'من فضلك أعد المحاولة')
            return res.redirect(`/dashboard/testimonial/edit/${dataId}`)
        }

    },

    //Delete City
    destroy: async (req, res) => {
        const {
            dataId
        } = req.params;
        try {
            const deleteData = await TestimonialSchema.findByIdAndDelete(dataId);

            req.flash('success', `تم الحذف`)
            return res.redirect(`/dashboard/testimonial`)
        } catch (err) {
            req.flash('error', 'من فضلك أعد المحاولة')
            return res.redirect(`/dashboard/testimonial`)

        }
    },

    searchShow: async (req, res) => {
        try {
            let csrfToken = req.csrfToken();
            const {
                table_search,
            } = req.body;
            const tbSearch = await TestimonialSchema.find({
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

            return res.render('screens/testimonialScreens/listAll', {
                thisUser: req.user,
                csrfToken,
                table_search,
                tbSearch
            })

        } catch (err) {

            req.flash('error', 'من فضلك أعد المحاولة')
            return res.render('screens/testimonialScreens/listAll', {
                thisUser: req.user,
                tbSearch: {},
                table_search,
                csrfToken
            })
        }


    },
}

module.exports = testimonialService