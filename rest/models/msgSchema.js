const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const Schema = mongoose.Schema;


const msgSchema = new Schema({
    name_contact:{type:String,required:true},
    lastname_contact:{type:String,required:true},
    message_contact:{type:String,required:true},
    contactMobileNo:{type:String},
    email_contact:{type:String},
    status:{type:String,default:'active'},
    createdAt: { type: Date, default: Date.now },
})

msgSchema.plugin(mongoosePaginate);


const MsgSchema =  mongoose.model('msgSchema', msgSchema);

module.exports = {MsgSchema}