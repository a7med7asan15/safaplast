const OrdersSchema = require('../models/ordersSchema');
const orderid = require('order-id')('dahabdoor')


const ordersService = {
    addOrder:async(req,res)=>{
        const {
                dates,
                adults,
                child,
                nameCustomer,
                customerMobileNo,
                propertyId
        } = req.body;
        const orderId = orderid.generate().split('-').join('')
        let domainName = process.env.devDomain
        if(process.env.STATUS === "PROD" ){
            domainName = process.env.hostDomain
        }
        try{
            const dateArray = dates.split('>')
            const checkIn = dateArray[0];
            const checkOut = dateArray[1];
            const order = new OrdersSchema({
                checkIn ,
                checkOut ,
                adults,
                child,
                nameCustomer,
                customerMobileNo,
                propertyId,
                orderId
            })
            await order.save();
            req.flash('name',order.nameCustomer)
            req.flash('ordernumber', order.orderId)
            return res.json({err:false,message:"Product Added Succesfully",domainName})
        }catch(err){
            console.log(err);
            return res.json({err:true,message:"Error In Getting order"})
        }

    },
    confirmOrder:async(req,res)=>{

        res.render('site/confirm');

    }













}

module.exports = ordersService