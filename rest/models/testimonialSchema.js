const mongoose = require('mongoose');


const Schema = mongoose.Schema;



const testimonialSchema = new Schema({
    name :  { type: String , required: true},
    job :  { type: String , required: true},
    quote :  { type: String , required: true},
})

const TestimonialSchema =  mongoose.model('testimonialSchema', testimonialSchema);

module.exports = TestimonialSchema