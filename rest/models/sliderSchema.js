const mongoose = require('mongoose');


const Schema = mongoose.Schema;



const sliderSchema = new Schema({
    title :  { type: String , required: true},
    subTitle :  { type: String },
    image :  { type: String , required: true},
    isButton :  { type: String , default:"false"},
    btnText :  { type: String },
    link :  { type: String },
})

const SliderSchema =  mongoose.model('sliderSchema', sliderSchema);

module.exports = {SliderSchema}