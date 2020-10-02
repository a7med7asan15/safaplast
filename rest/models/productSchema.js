const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');


const Schema = mongoose.Schema;

const images = new Schema({
    imageLink: {
        type: String
    }
})

const productSchema  = new Schema({
    title :  { type: String , required: true},
    type  :  { type: String , required: true},
    images  :  [images],
    

})



productSchema.plugin(slug, {
        lang: "ar",
    }),
    productSchema.plugin(mongoosePaginate);
const ProductSchema = mongoose.model('productSchema', productSchema);


module.exports = ProductSchema