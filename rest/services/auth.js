const User = require('../models/Users');

const ProductSchema = require('../models/productSchema');
const _ = require('lodash');
const {
    MsgSchema
} = require('../models/msgSchema');
const NewsSchema = require('../models/newsSchema');
const ClientSchema = require('../models/clientSchema');
const CertificateSchema = require('../models/certificateSchema');
const SettingSchema = require('../models/settingSchema');


const authService = {
    show: async (req, res) => {
        res.render('screens/authScreens/loginScreen', {
            title: 'Login',
            message: 'Hello there!'
        })
    },
    action: async (req, res) => {

    },
    homepage: async (req, res) => {
        try {
            const products = await ProductSchema.find()
            const news = await NewsSchema.find({
                tag: "news"
            })
            const portfolio = await NewsSchema.find({
                tag: "portfolio"
            })
            const clients = await ClientSchema.find()
            const setting = (await SettingSchema.find().limit(1))[0]
            const certificates = await CertificateSchema.find()
            return res.render('screens/homeScreen', {
                thisUser: req.user,
                setting, 
                news, 
                portfolio, 
                products, 
                certificates, 
                clients, 
                title:"لوحة التحكم"
            })
        } catch (err) {


        }

    },
    destroy: async (req, res) => {
        req.session.destroy(() => {
            res.redirect('/dashboard/login')
        })
    }
}

module.exports = authService