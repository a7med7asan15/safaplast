const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const Schema = mongoose.Schema;

const colorSchema  = new Schema({
    name:{ type: String, required: true},
    colorHex:{type:String , required :true}

})

colorSchema.plugin(mongoosePaginate);

const ColorSchema = mongoose.model('colorSchema', colorSchema);

module.exports = ColorSchema;