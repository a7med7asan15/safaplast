const User = require('../models/Users');

const ProductSchema = require('../models/productSchema');
const _ = require('lodash');
const { MsgSchema } = require('../models/msgSchema');


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
            
            return res.render('screens/homeScreen', {
                thisUser: req.user,
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