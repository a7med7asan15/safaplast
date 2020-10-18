const mongoose = require('mongoose');


const Schema = mongoose.Schema;



const certificateSchema = new Schema({
    name :  { type: String , required: true},
    img :  { type: String , required: true},
})

const CertificateSchema =  mongoose.model('certificateSchema', certificateSchema);

module.exports = CertificateSchema