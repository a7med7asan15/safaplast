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
            const dataProvided = await CertificateSchema.find();
            return res.render('screens/certificateScreens/listAdd', {
                thisUser: req.user,
                csrfToken,
                dataProvided, 
                title:"الشهادات"
            })
        } catch (err) {
            console.log(err)
            res.send("error");

        }



    },

    add: async (req, res) => {



        const {
            name,
            img
        } = req.body;


        try {


            const newData = new CertificateSchema({


                name,

                img


            })


            await newData.save();

            return res.redirect('/dashboard/certificates');

        } catch (err) {
            console.log(err)
            req.flash('error', "من فضلك أعد المحاولة")
        }





    },

    update: async (req, res) => {
        const {
          name,
          img,
        } = req.body;
        const {
            dataId
        } = req.params
        try {
          const updateData = await CertificateSchema.findById(dataId);

          updateData.name = name;
          updateData.img = img;
          await updateData.save();
    
          req.flash('success', 'تم تعديل الشهادة بنجاح')
          return res.redirect(`/dashboard/certificates/edit/${dataId}`)
    
    
        } catch (err) {
          req.flash('error', 'من فضلك أعد المحاولة')
          return res.redirect(`/dashboard/certificates/edit/${dataId}`)
    
        }
    
      },
    showOne: async (req, res) => {
        const {
          dataId
        } = req.params
        let csrfToken = req.csrfToken();
    
    
        try {
    
    
          const cert = await CertificateSchema.findById(dataId);
          return res.render('screens/certificateScreens/edit', {
            thisUser: req.user,
            dataProvided: cert,
            csrfToken,
            title:"تعديل شهادة"
    
          })
        } catch (err) {
          req.flash('error', 'من فضلك أعد المحاولة')
          console.log(err);
          return res.render('screens/certificateScreens/edit', {
            thisUser: req.user,
            dataProvided: {},
            csrfToken
          })
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

}

module.exports = certificateService