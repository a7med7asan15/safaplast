const ProductSchema = require('../../models/productSchema');
const SliderSchema = require('../../models/sliderSchema');
const NewsSchema = require('../../models/newsSchema');
const ClientSchema = require('../../models/clientSchema');
const CertificateSchema = require('../../models/certificateSchema');
const SettingSchema = require('../../models/settingSchema');
const request = require('request')
const  bodyParser  =  require('body-parser');


const {
    MsgSchema
} = require('../../models/msgSchema');

const homePageService = {

    show: async (req, res) => {

        try{

        
        let domainName = process.env.devDomain
        if (process.env.STATUS === "PROD") {
            domainName = process.env.hostDomain
        }
        const slides = await SliderSchema.find()
        const products = await ProductSchema.find()
        const news = await NewsSchema.find({
            tag:"news"
        })
        const portfolio = await NewsSchema.find({
            tag:"portfolio"
        })
        const clients = await ClientSchema.find()
        const setting = (await SettingSchema.find().limit(1))[0]
        let csrfToken = req.csrfToken();
        if (req.isAuthenticated()) {
            isAuthed = true;
            userType = req.user.role;
            if(req.user.role == 1 || req.user.role == 0){
                res.render('site/homepage', {
                    title: 'ElsafaPlast for Electric Industries',
                    metDescription: 'Elsafa Plast Electric',
                    ogTitle: 'ElsafaPlast Electric',
                    ogDomain: domainName,
                    slides, 
                    products, 
                    news, 
                    clients, 
                    setting, 
                    portfolio,
                    csrfToken
        
                })
        
            }else{
                res.render('site/homepage', {
                    title: 'ElsafaPlast for Electric Industries',
                    metDescription: 'Elsafa Plast Electric',
                    ogTitle: 'ElsafaPlast Electric',
                    ogDomain: domainName,
                    slides, 
                    products, 
                    news, 
                    clients, 
                    setting, 
                    portfolio,
                    csrfToken
        
                })
        
            }
        }else{
            res.render('site/homepage', {
                title: 'ElsafaPlast for Electric Industries',
                metDescription: 'Elsafa Plast Electric',
                ogTitle: 'ElsafaPlast Electric',
                ogDomain: domainName,
                slides, 
                products, 
                news, 
                clients, 
                setting, 
                portfolio,
                csrfToken
    
            })
    
        }
    }catch(err){
        console.log(err)
    }
        
    },




    certPage: async (req, res) => {
        const certificates = await CertificateSchema.find()
        const setting = (await SettingSchema.find().limit(1))[0]
        return res.render('site/certificates', {
            title: 'Certificates - Elsafa Plast',
            metDescription: 'Elsafa Plast for electric Industries',
            ogTitle: 'Elsafa Plast for electric Industries',
            dataProvided: certificates,
            setting

        });

    },

    aboutPage: async (req, res) => {

        return res.render('site/about', {
            title: 'الأسئلة الشائعة',
            metDescription: 'Elsafa Plast for electric Industries',
            ogTitle: 'Elsafa Plast for electric Industries',
        });

    },


    contactPage: async (req, res) => {
        let csrfToken = req.csrfToken();
        const setting = (await SettingSchema.find().limit(1))[0]
        return res.render('site/contact', {
            title: 'Contact us - Elsafa Plast',
            metDescription: 'عنوان دهب دورز',
            ogTitle: 'عنوان دهب دورز',
            csrfToken, 
            setting
        });

    },
    sendMsg: async (req, res) => {
        try {
            const {
                name,
                email,
                phone,
                message, 
                captcha
            } = req.body;
            const secretKey = "6LdDxdgZAAAAADauKRCexbZd-Fpb4B4pMhacjkFv"
            const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body['g-recaptcha-response']}`;

            request(verifyUrl, (err, response, body) => {
                body = JSON.parse(body);
                console.log(body)
                if (!body.success || body.success === undefined) {
                    valid = false
                    return res.json({
                        "success": false,
                        "msg": "captcha verification failed", 
                        "err":true, 
                        err:true
                    });
                } 
                const msg = new MsgSchema({
                    name_contact:name,
                    contactMobileNo: phone,
                    email_contact:email,
                    message_contact:message
                })
                 msg.save();
                 console.log(msg)
                return res.json({
                    "success": true,
                    "msg": "captcha verification passed",
                    err:false, 
                    "err":false
                });
                



            });


        } catch (err) {
            req.flash('error', "من فضلك أعد المحاولة")
            console.log(err)
            return res.json({
                "err": true,
                err: true,
                message: "Error In Getting Message",
            })
        }


    }, 
    downloadCatalog: async (req, res) => {
        try {
            const {
                name,
                email,
                phone,
                captcha
            } = req.body;
            const secretKey = "6LdDxdgZAAAAADauKRCexbZd-Fpb4B4pMhacjkFv"
            const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body['g-recaptcha-response']}`;

            request(verifyUrl, (err, response, body) => {
                body = JSON.parse(body);
                if (!body.success || body.success === undefined) {
                    valid = false
                    return res.json({
                        "success": false,
                        "msg": "captcha verification failed", 
                        err:true, 
                        "err":true
                    });
                } 
                const msg = new MsgSchema({
                    name_contact:name,
                    contactMobileNo: phone,
                    email_contact:email,
                    message_contact:"Download"
                })
                 msg.save();

                return res.json({
                    "success": true,
                    "msg": "captcha verification passed",
                    err:false, 
                    "err":false
                });
                



            });
            

        } catch (err) {
            req.flash('error', "من فضلك أعد المحاولة")
            console.log(err)
            return res.json({
                "error": true,
                errors: true,
                message: "Error In Getting Message",
            })
        }


    }

}

module.exports = homePageService