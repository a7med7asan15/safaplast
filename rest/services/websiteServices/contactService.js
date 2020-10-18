const _ = require('lodash');
const { MsgSchema } = require('../../models/msgSchema');


const contactService = {

    show: async (req, res) => {
        let csrfToken = req.csrfToken();
        let page = 1;
            let limit = 1;

            if (req.query.p) {
                page = parseInt(req.query.p, 10)
            }
            const options = {
                page,
                limit: 20,
                sort:{
                    createdAt: 'desc'
                }
            }

            const msgs = await MsgSchema.paginate({
                status:"active"
            }, options)
        try {
            return res.render('screens/contactScreens/messages', {
                thisUser: req.user,
                csrfToken,
                ensearch:false, 
                dataProvided:msgs, 
                dateNow: Date.now(),
                title:"الرسائل القادمة"
            })
        } catch (err) {
            console.log(err);
            res.send("error");
        }
    },
    showOld: async (req, res) => {
        let csrfToken = req.csrfToken();
        let page = 1;
            let limit = 1;

            if (req.query.p) {
                page = parseInt(req.query.p, 10)
            }
            const options = {
                page,
                limit: 20,
                sort:{
                    createdAt: 'desc'
                }
            }

            const msgs = await MsgSchema.paginate({
                status:"inactive"
            }, options)
        try {
            return res.render('screens/contactScreens/decmessages', {
                thisUser: req.user,
                csrfToken,
                ensearch:false, 
                dataProvided:msgs, 
                dateNow: Date.now(),
                title:"الرسائل القديمة"
            })
        } catch (err) {
            console.log(err);
res.send("error");
        }
    },
    delete: async (req, res) => {
        const {
            id
        } = req.query
        try {
            const msg = await MsgSchema.findById(id);
            msg.status = 'inactive';
            msg.save();
            req.flash('success', 'تمت العملية بنجاح')
            return res.redirect('/dashboard/messages')
        } catch (err) {
            req.flash('error ', 'حدث خطأ برجاء اعادة المحاولة')
            return res.redirect('/dashboard/messages')

        }
    },
}
module.exports = contactService