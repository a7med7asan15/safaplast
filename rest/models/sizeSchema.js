const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');



const Schema = mongoose.Schema;

const sizeSchema  = new Schema({
    nameEnglish:{ type: String, required: true},
    nameArabic: { type: String, required: true},
})

sizeSchema.plugin(mongoosePaginate);

 

module.exports = mongoose.model('sizeSchema', sizeSchema);
