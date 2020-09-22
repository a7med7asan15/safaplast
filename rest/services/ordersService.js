const {
    OrdersSchema,
    TotalOrderSchema
} = require('../models/ordersSchema');
const ordersSchema = require('../models/ordersSchema');
const orderid = require('order-id')('dahabdoor')


const ordersService = {
    addOrder: async (req, res) => {
        const {
            orders,
            cuName,
            cuMob
        } = req.body;
        const orderId = orderid.generate().split('-').join('')
        let domainName = process.env.devDomain
        if (process.env.STATUS === "PROD") {
            domainName = process.env.hostDomain
        }
        try {
            const ord = JSON.parse(orders);
            const orderComing = [];
            var totalOrderPrice=0;
            var loops = JSON.parse(orders);

            for(i=0 ; i < loops.length; i++){
                var timeDiff = Math.abs(Date.parse(ord[i].dateEnd) - Date.parse(ord[i].dateStart));
                numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
                totalPrice = ord[i].price * numberOfNights;
                totalOrderPrice=totalOrderPrice+totalPrice;
                var o = {
                    checkIn : ord[i].dateStart,
                    checkOut : ord[i].dateEnd, 
                    adults : ord[i].adults,
                    child : ord[i].child,   
                    propertyId : ord[i].id,
                    nights: numberOfNights, 
                    totalPrice
                }
                orderComing.push(o);
                
                
            }  
            
            const order = new TotalOrderSchema({
                nameCustomer: cuName,
                orderId,
                customerMobileNo: cuMob,
                totalPrice: totalOrderPrice,
                orders: orderComing,
            })
            await order.save();
            req.flash('name', orders.cuName)
            req.flash('ordernumber', orders.orderId)
            return res.json({
                err: false,
                message: "Product Added Succesfully",
                domainName
            })
        } catch (err) {
            console.log(err);
            return res.json({
                err: true,
                message: "Error In Getting order"
            })
        }

    },
    confirmOrder: async (req, res) => {

        res.render('site/confirm');

    }













}

module.exports = ordersService