const User = require('../models/Users');
const OrdersSchema = require('../models/ordersSchema');
const PropertySchema = require('../models/propertySchema');
const _ = require('lodash');


const authService ={
    show: async (req,res)=>{
        res.render('screens/authScreens/loginScreen', { title: 'Hey', message: 'Hello there!' })
    },
    action: async(req,res)=>{

    },
    homepage: async(req,res)=>{
        try{
            const countOrders = await OrdersSchema.count({review:'pending'});
            const acceptedOrders = await OrdersSchema.count({review:'accept'});
            const bookedOrders = await OrdersSchema.count({review:'booked'});
            const totalPropertys = await PropertySchema.count();
            console.log(countOrders); 
            return  res.render('screens/homeScreen', { thisUser:req.user ,countOrders,acceptedOrders,totalPropertys,bookedOrders })
        }catch(err){


        }

    },
    destroy: async (req , res )=>{
        req.session.destroy(()=>{
            res.redirect('/dashboard/login')
        })  
    }
}

module.exports = authService