const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const Schema = mongoose.Schema;



const clientSchema = new Schema({
    name :  { type: String , required: true},
    img :  { type: String },
})

clientSchema.plugin(mongoosePaginate);

const ClientSchema =  mongoose.model('clientSchema', clientSchema);

module.exports = ClientSchema