const SettingSchema = require('../models/settingSchema');

const settingService = {

    show: async (req, res) => {
        let page = 1;
        let limit = 1;

        if (req.query.p) {
            page = parseInt(req.query.p, 10)
        }


        let csrfToken = req.csrfToken();

        try {

            const dataProvided = (await SettingSchema.find().limit(1))[0]
            return res.render('screens/settingScreens/add', {
                thisUser: req.user,
                csrfToken,
                dataProvided, 
                title:"الاعدادات"
            })
        } catch (err) {

            console.log(err);
res.send("error");

        }



    },

    add: async (req, res) => {
        const {
            facebook,
            linkedin,
            youtube,
            logo, 
            catalog, 
            favicon
        } = req.body

        try {
            const updateData = (await SettingSchema.find().limit(1))[0]
            updateData.facebook = facebook,
                updateData.linkedin = linkedin,
                updateData.youtube = youtube,
                updateData.logo=logo
                updateData.catalog=catalog
                updateData.favicon=favicon
                await updateData.save();
            req.session.passedData = false
            req.flash('success', 'تمت العملية بنجاح')

            return res.json({
                err: false,
                message: "تمت بنجاح"
              });
        } catch (err) {
            req.flash('error', 'من فضلك أعد المحاولة')
        }

    },

}

module.exports = settingService