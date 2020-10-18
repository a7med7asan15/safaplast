const ProductSchema = require('../../models/productSchema');
const SliderSchema = require('../../models/sliderSchema');
const NewsSchema = require('../../models/newsSchema');
const ClientSchema = require('../../models/clientSchema');
const CertificateSchema = require('../../models/certificateSchema');

const {
    MsgSchema
} = require('../../models/msgSchema');

const homePageService = {

    show: async (req, res) => {
        let domainName = process.env.devDomain
        if (process.env.STATUS === "PROD") {
            domainName = process.env.hostDomain
        }
        const slides = await SliderSchema.find()
        const products = await ProductSchema.find()
        const news = await NewsSchema.find()
        const clients = await ClientSchema.find()
        res.render('site/homepage', {
            title: 'ElsafaPlast for electric industries',
            metDescription: 'Elsafa Plast Electric',
            ogTitle: 'ElsafaPlast Electric',
            ogDomain: domainName,
            slides, 
            products, 
            news, 
            clients

        })

    },




    certPage: async (req, res) => {
        const certificates = await CertificateSchema.find()
        return res.render('site/certificates', {
            title: 'الأسئلة الشائعة',
            metDescription: 'اسئلة شائعة عن طريقة تأجير الوحدات فى دهب مع دهب دورز',
            ogTitle: 'اسئلة شائعة عن طريقة تأجير الوحدات فى دهب مع دهب دورز',
            dataProvided: certificates,

        });

    },

    aboutPage: async (req, res) => {

        return res.render('site/about', {
            title: 'الأسئلة الشائعة',
            metDescription: 'اسئلة شائعة عن طريقة تأجير الوحدات فى دهب مع دهب دورز',
            ogTitle: 'اسئلة شائعة عن طريقة تأجير الوحدات فى دهب مع دهب دورز',
        });

    },


    contactPage: async (req, res) => {
        let csrfToken = req.csrfToken();
        return res.render('site/contact', {
            title: 'تواصل معنا',
            metDescription: 'عنوان دهب دورز',
            ogTitle: 'عنوان دهب دورز',
            csrfToken
        });

    },
    sendMsg: async (req, res) => {
        try {
            const {
                name_contact,
                lastname_contact,
                message_contact,
                phone_contact,
                email_contact,
                captcha
            } = req.body;
            console.log(req.body)
            if (!req.body.captcha) {
                return res.json({
                    errors: true,
                    "success": false,
                    "msg": "Capctha is not checked"
                });

            }
            const secretKey = "6Le8rs8ZAAAAANNqQUUwT0nCWmdEU2iOcWtrZ5rg"
            const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}`;

            request(verifyUrl, (err, response, body) => {
                var valid = true;
                body = JSON.parse(body);

                if (!body.success && body.success === undefined) {
                    valid = false
                    return res.json({
                        "success": false,
                        "msg": "captcha verification failed"
                    });
                } else if (body.score < 0.5) {
                    valid = false
                    return res.json({
                        "success": false,
                        "msg": "you might be a bot, sorry!",
                        "score": body.score,
                    });
                }
                return res.json({
                    "success": true,
                    "msg": "captcha verification passed",
                    "score": body.score,
                });
                // return json message or continue with your function. Example: loading new page, ect
                //


            });
            if (valid) {
                const msg = new MsgSchema({
                    name_contact,
                    lastname_contact,
                    message_contact,
                    contactMobileNo: phone_contact,
                    email_contact,
                })
                await msg.save();
                req.flash('success', "لقد تم إرسال الرسالة بنجاح")

            } else {
                req.flash('errors', "من فضلك أعد المحاولة")

            }




        } catch (err) {
            req.flash('error', "من فضلك أعد المحاولة")
            return res.json({
                "error": true,
                errors: true,
                message: "Error In Getting Message",
            })
        }


    }

}

module.exports = homePageService