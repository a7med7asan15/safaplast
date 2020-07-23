const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');



const Schema = mongoose.Schema;

const sizeSchema  = new Schema({
    name:{ type: String, required: true},
})

sizeSchema.plugin(mongoosePaginate);

const SizeSchema = mongoose.model('sizeSchema', sizeSchema);

module.exports = SizeSchema;
