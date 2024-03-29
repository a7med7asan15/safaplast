const SliderSchema = require('../models/sliderSchema');

const sliderService = {

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
            const dataProvided = await SliderSchema.paginate({}, options);
            return res.render('screens/sliderScreens/listAll', {
                thisUser: req.user,
                csrfToken,
                dataProvided, 
                title:"السلايدز"
            })
        } catch (err) {

            console.log(err);
            res.send("error");

        }



    },
    addPage: async (req, res) => {
        let csrfToken = req.csrfToken();
        try {
            return res.render('screens/sliderScreens/add', {
                thisUser: req.user,
                csrfToken,
                title: "سلايد جديد"
            })

        } catch (err) {
            console.log(err)
            res.send("error")
        }

    },
    add: async (req, res) => {



        const {
            title,
            subTitle,
            img,
            link,
            btnText,
            isButton
        } = req.body;


        try {
            var isBtn
            if (!isButton) {
                isBtn = "false"
            } else {
                isBtn = "true"
            }

            const newData = new SliderSchema({

                title,
                subTitle,
                img,
                link,
                btnText,
                isButton: isBtn


            })


            await newData.save();
            req.flash('success', 'تم الاضافة بنجاح')
            return res.redirect('/dashboard/slider');

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

            const dataProvided = await SliderSchema.findById(dataId);

            return res.render('screens/sliderScreens/edit', {
                thisUser: req.user,
                dataProvided,
                csrfToken, 
                title:"تعديل سلايد"
            })
        } catch (err) {
            req.flash('error', 'من فضلك أعد المحاولة')
            return res.render('screens/sliderScreens/edit', {
                thisUser: req.user,
                dataProvided: {},
                csrfToken
            })
        }

    },

    //Update City
    update: async (req, res) => {
        const {
            title,
            subTitle,
            img,
            link,
            btnText,
            isButton
        } = req.body
        const {
            dataId
        } = req.params
        try {
            var isBtn
            if (!isButton) {
                isBtn = "false"
            } else {
                isBtn = "true"
            }
            const updateData = await SliderSchema.findById(dataId)
            updateData.title = title,
            updateData.subTitle = subTitle,
            updateData.img = img,
            updateData.link = link,
            updateData.btnText = btnText,
            updateData.isButton = isBtn,

                await updateData.save();
            req.session.passedData = false
            req.flash('success', 'تمت العملية بنجاح')
            return res.redirect(`/dashboard/slider/edit/${dataId}`)
        } catch (err) {
            req.flash('error', 'من فضلك أعد المحاولة')
            return res.redirect(`/dashboard/slider/edit/${dataId}`)
        }

    },

    //Delete City
    destroy: async (req, res) => {
        const {
            dataId
        } = req.params;
        try {
            const deleteData = await SliderSchema.findByIdAndDelete(dataId);

            req.flash('success', `تم الحذف`)
            return res.redirect(`/dashboard/slider`)
        } catch (err) {
            req.flash('error', 'من فضلك أعد المحاولة')
            return res.redirect(`/dashboard/slider`)

        }
    },

    searchShow: async (req, res) => {
        try {
            let csrfToken = req.csrfToken();
            const {
                table_search,
            } = req.body;
            const tbSearch = await SliderSchema.find({
                "$or": [{
                        title: {
                            '$regex': table_search,
                            '$options': 'i'
                        }
                    },
                    {
                        subTitle: {
                            '$regex': table_search,
                            '$options': 'i'
                        }
                    },
                ]
            });

            return res.render('screens/sliderScreens/listAll', {
                thisUser: req.user,
                csrfToken,
                table_search,
                tbSearch, 
                title:"نتائج البحث"
            })

        } catch (err) {

            req.flash('error', 'من فضلك أعد المحاولة')
            return res.render('screens/sliderScreens/listAll', {
                thisUser: req.user,
                tbSearch: {},
                table_search,
                csrfToken
            })
        }


    },
}

module.exports = sliderService