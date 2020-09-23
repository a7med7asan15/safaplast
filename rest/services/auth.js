const User = require('../models/Users');
const {OrdersSchema, TotalOrderSchema} = require('../models/ordersSchema');
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
            const countOrders = await TotalOrderSchema.count({review:'pending'});
            const acceptedOrders = await TotalOrderSchema.count({status:'waiting'});
            const bookedOrders = await TotalOrderSchema.count({review:'active'});
            const totalPropertys = await PropertySchema.count();
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