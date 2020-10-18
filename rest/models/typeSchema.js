const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const slug = require('mongoose-slug-generator');


const Schema = mongoose.Schema;


const typeSchema = new Schema({
    name:{type:String,required:true},
    slug:{ type: String, slug: ["name"], slug_padding_size: 4,  unique: true } ,
})

typeSchema.plugin(mongoosePaginate);
typeSchema.plugin(slug, {
    lang: "en",
});

const TypeSchema =  mongoose.model('typeSchema', typeSchema);

module.exports = TypeSchema