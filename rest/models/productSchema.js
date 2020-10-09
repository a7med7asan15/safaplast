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
    type  :  { type : Schema.Types.ObjectId , ref:'typeSchema'},
    images  :  [images],
    htmlInfo: { type: String , default:"#"}, 
    htmlTable: { type: String , default:"#"}, 
    code: { type: String , required: true},
    slug:{ type: String, slug: ["title"], slug_padding_size: 4,  unique: true } ,

})



productSchema.plugin(slug, {
        lang: "en",
    });
productSchema.plugin(mongoosePaginate);
const ProductSchema = mongoose.model('productSchema', productSchema);


module.exports = ProductSchema