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
            console.log(err);
res.send("error");

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
            req.flash('error', 'من فضلك أعد المحاولة')
            res.send("error")
        }





    },

    showOne: async (req, res) => {
        req.session.lastlink = req.url
        let csrfToken = req.csrfToken();

        try {
            const {
                dataId
            } = req.params

            const type = await TypeSchema.findById(dataId);

            return res.render('screens/typeScreens/edit', {
                thisUser: req.user,
                dataProvided: type,
                csrfToken, 
                title:"تعديل النوع"
            })
        } catch (err) {
            req.flash('error', 'من فضلك أعد المحاولة')
            return res.render('screens/typeScreens/edit', {
                thisUser: req.user,
                dataProvided: {},
                csrfToken
            })
        }

    },

    //Update Data
    update: async (req, res) => {
        const {
            name
        } = req.body
        const {
            dataId
        } = req.params
        try {
            const updateData = await TypeSchema.findById(dataId)
            updateData.name = name,
                await updateData.save();
            req.session.passedData = false
            req.flash('success', 'تم تعديل النوع بنجاح')
            return res.redirect(`/dashboard/type/edit/${dataId}`)
        } catch (err) {
            req.flash('error', 'من فضلك أعد المحاولة')
            return res.redirect(`/dashboard/type/edit/${dataId}`)
        }

    },

    //Delete Data
    destroy: async (req, res) => {
        const {
            dataId
        } = req.params;
        try {
            const deleteData = await TypeSchema.findByIdAndDelete(dataId);

            req.flash('success', ` بنجاح ${deleteData.name} تم حذف`)
            return res.redirect(`/dashboard/type`)
        } catch (err) {
            req.flash('error', 'من فضلك أعد المحاولة')
            return res.redirect(`/dashboard/type`)

        }
    },

    searchShow: async (req, res) => {
        try {
            let csrfToken = req.csrfToken();
            const {
                table_search,
            } = req.body;
            const tbSearch = await TypeSchema.find({
                "$or": [{
                        name: {
                            '$regex': table_search,
                            '$options': 'i'
                        }
                    },
                ]
            });

            return res.render('screens/typeScreens/listAll', {
                thisUser: req.user,
                csrfToken,
                table_search,
                tbSearch, 
                title:"نتائج البحث"
            })

        } catch (err) {

            req.flash('error', 'من فضلك أعد المحاولة')
            return res.render('screens/typeScreens/listAll', {
                thisUser: req.user,
                tbSearch: {},
                table_search,
                csrfToken
            })
        }


    },
}

module.exports = typeService