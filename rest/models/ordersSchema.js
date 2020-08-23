const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const Schema = mongoose.Schema;

const ordersSchema  = new Schema({
    checkIn:{ type: String, required: true},
    orderId:{type:String,required:true},
    checkOut:{ type: String, required: true},
    nameCustomer:{type:String,required:true},
    status:{type:String,required:true ,default:'pending'},
    adults:{type:String},
    child:{type:String},
    customerMobileNo:{type:String},
    propertyId: { type : Schema.Types.ObjectId , ref : 'propertySchema' },
    review:{type:String,default:'pending'},
    status:{type:String,default:'active'},
    createdAt: { type: Date, default: Date.now },
})

ordersSchema.plugin(mongoosePaginate);


const OrdersSchema =  mongoose.model('ordersSchema', ordersSchema);

module.exports = OrdersSchema
