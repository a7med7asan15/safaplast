const User = require('../models/Users');
const BrokerSchema = require('../models/brokerSchema');
const {
    OrdersSchema,
    TotalOrderSchema
} = require('../models/ordersSchema');
const PropertySchema = require('../models/propertySchema');
const _ = require('lodash');
const { MsgSchema } = require('../models/msgSchema');


const authService = {
    show: async (req, res) => {
        res.render('screens/authScreens/loginScreen', {
            title: 'Hey',
            message: 'Hello there!'
        })
    },
    action: async (req, res) => {

    },
    homepage: async (req, res) => {
        try {
            const countOrders = await TotalOrderSchema.count({
                review: 'pending',
            });
            const acceptedOrders = await TotalOrderSchema.count({
                review:"done",
                status: "waiting"
            });
            const bookedOrders = await TotalOrderSchema.count({
                review:"done",
                status: "active"
            });
            const totalPropertys = await PropertySchema.count();
            const countBrokers = await BrokerSchema.count();
            const countMsg = await MsgSchema.count({
                status:"active"
            });
            return res.render('screens/homeScreen', {
                thisUser: req.user,
                countOrders,
                acceptedOrders,
                totalPropertys,
                bookedOrders, 
                countBrokers, 
                countMsg
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