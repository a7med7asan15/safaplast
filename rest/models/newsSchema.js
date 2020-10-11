const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const slug = require('mongoose-slug-generator');


const Schema = mongoose.Schema;


const newsSchema = new Schema({
    title :  { type: String , required: true},
    createdAt: { type: Date, default: Date.now },
    featuredImage:{type:String, required: true},
    htmlArticle: { type: String , required: true}, 
    slug:{ type: String, slug: ["title"], slug_padding_size: 4,  unique: true },
    tag :  { type: String , default:"news"},
})

newsSchema.plugin(mongoosePaginate);
newsSchema.plugin(slug, {
    lang: "en",
});
const NewsSchema =  mongoose.model('newsSchema', newsSchema);

module.exports = NewsSchema