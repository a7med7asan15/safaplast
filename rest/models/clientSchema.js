const mongoose = require('mongoose');


const Schema = mongoose.Schema;



const clientSchema = new Schema({
    name :  { type: String , required: true},
    logo :  { type: String , required: true},
})

const ClientSchema =  mongoose.model('clientSchema', clientSchema);

module.exports = {ClientSchema}