const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const Schema = mongoose.Schema;



const ordersSchema  = new Schema({
    checkIn:{ type: Date ,  required: true},
    checkOut:{ type: Date, required: true},
    status:{type:String,required:true ,default:'pending'},
    adults:{type:String},
    child:{type:String},
    nights:{type:Number},
    propertyId: { type : Schema.Types.ObjectId , ref : 'propertySchema' },
})

const totalOrderSchema = new Schema({
    nameCustomer:{type:String,required:true},
    orderId:{type:String ,required:true},
    totalPrice:{type:Number},
    customerMobileNo:{type:String},
    review:{type:String,default:'pending'},
    status:{type:String,default:'active'},
    createdAt: { type: Date, default: Date.now },
    orders:[ordersSchema],


})

ordersSchema.plugin(mongoosePaginate);

totalOrderSchema.plugin(mongoosePaginate);


const OrdersSchema =  mongoose.model('ordersSchema', ordersSchema);
const TotalOrderSchema =  mongoose.model('totalOrderSchema', totalOrderSchema);

module.exports = {OrdersSchema, TotalOrderSchema}
