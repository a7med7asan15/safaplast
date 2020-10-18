const ClientSchema = require('../models/clientSchema');

const clientService = {

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
            const dataProvided = await ClientSchema.find();
            return res.render('screens/clientScreens/listAdd', {
                thisUser: req.user,
                csrfToken,
                dataProvided, 
                title:"العملاء"
            })
        } catch (err) {

            console.log(err);
            res.send("error");

        }



    },

    add: async (req, res) => {



        const {
            name,
            img
        } = req.body;


        try {


            const newData = new ClientSchema({


                name,

                img


            })


            await newData.save();

            return res.redirect('/dashboard/clients');

        } catch (err) {

            console.log(err);
            res.send("error");

        }





    },

    //Delete City
    destroy: async (req, res) => {
        const {
            dataId
        } = req.params;
        try {
            const deleteData = await ClientSchema.findByIdAndDelete(dataId);

            req.flash('success', `تم الحذف`)
            return res.redirect(`/dashboard/clients`)
        } catch (err) {
            req.flash('error', 'من فضلك أعد المحاولة')
            return res.redirect(`/dashboard/clients`)

        }
    },

}

module.exports = clientService