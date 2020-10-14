const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const Schema = mongoose.Schema;



const sliderSchema = new Schema({
    title :  { type: String , required: true},
    subTitle :  { type: String },
    img :  { type: String },
    isButton :  { type: String , default:"false"},
    btnText :  { type: String },
    link :  { type: String },
})

sliderSchema.plugin(mongoosePaginate);

const SliderSchema =  mongoose.model('sliderSchema', sliderSchema);

module.exports = SliderSchema