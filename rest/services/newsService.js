const NewsSchema = require('../models/newsSchema');

const newsService = {

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
            const dataProvided = await NewsSchema.paginate({
                tag:"news"
            }, options);
            return res.render('screens/newsScreens/listAll', {
                thisUser: req.user,
                csrfToken,
                dataProvided, 
                title:"الاخبار"
            })
        } catch (err) {

            console.log(err);
            res.send("error");

        }



    },
    showPort: async (req, res) => {
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
            const dataProvided = await NewsSchema.paginate({
                tag:"portfolio"
            }, options);
            return res.render('screens/newsScreens/listAll', {
                thisUser: req.user,
                csrfToken,
                dataProvided, 
                title:"المشاريع السابقة"
            })
        } catch (err) {

            console.log(err);
            res.send("error");

        }



    },
    addPage: async (req, res) => {
        let csrfToken = req.csrfToken();
        try {
            return res.render('screens/newsScreens/add', {
                thisUser: req.user,
                csrfToken,
                title: "بوست جديد"
            })

        } catch (err) {
            console.log(err)
            res.send("error")
        }

    },
    add: async (req, res) => {



        const {
            title,
            htmlArticle,
            featuredImage,
            tag
        } = req.body;


        try {


            const newData = new NewsSchema({

                title,
                htmlArticle,
                featuredImage,
                tag

            })


            await newData.save();

            return res.redirect('/dashboard/news');

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

            const dataProvided = await NewsSchema.findById(dataId);

            return res.render('screens/newsScreens/edit', {
                thisUser: req.user,
                dataProvided,
                csrfToken, 
                title:"تعديل بوست"
            })
        } catch (err) {
            req.flash('error', 'من فضلك أعد المحاولة')
            return res.render('screens/newsScreens/edit', {
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
            htmlArticle,
            featuredImage,
            tag
        } = req.body
        const {
            dataId
        } = req.params
        try {
            const updateData = await NewsSchema.findById(dataId)
            updateData.title = title,
                updateData.htmlArticle = htmlArticle,
                updateData.featuredImage = featuredImage,
                updateData.tag=tag
                await updateData.save();
            req.session.passedData = false
            req.flash('success', 'تمت العملية بنجاح')
            //return res.redirect(`/dashboard/news/edit/${dataId}`)
            return res.json({
                err: false,
                message: "تمت بنجاح"
              });
        } catch (err) {
            req.flash('error', 'من فضلك أعد المحاولة')
            return res.redirect(`/dashboard/news/edit/${dataId}`)
        }

    },

    //Delete City
    destroy: async (req, res) => {
        const {
            dataId
        } = req.params;
        try {
            const deleteData = await NewsSchema.findByIdAndDelete(dataId);

            req.flash('success', `تم الحذف`)
            return res.redirect(`/dashboard/news`)
        } catch (err) {
            req.flash('error', 'من فضلك أعد المحاولة')
            return res.redirect(`/dashboard/news`)

        }
    },

    searchShow: async (req, res) => {
        try {
            let csrfToken = req.csrfToken();
            const {
                table_search,
            } = req.body;
            const tbSearch = await NewsSchema.find({
                "$or": [{
                    title: {
                        '$regex': table_search,
                        '$options': 'i'
                    }
                }, ],
                tag: "news"
            });

            return res.render('screens/newsScreens/listAll', {
                thisUser: req.user,
                csrfToken,
                table_search,
                tbSearch, 
                title:"نتائج البحث"
            })

        } catch (err) {

            req.flash('error', 'من فضلك أعد المحاولة')
            return res.render('screens/newsScreens/listAll', {
                thisUser: req.user,
                tbSearch: {},
                table_search,
                csrfToken
            })
        }


    },
}

module.exports = newsService

