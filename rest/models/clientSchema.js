const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const Schema = mongoose.Schema;



const clientSchema = new Schema({
    name :  { type: String , required: true},
    logo :  { type: String , required: true},
})

clientSchema.plugin(mongoosePaginate);

const ClientSchema =  mongoose.model('clientSchema', clientSchema);

module.exports = ClientSchema