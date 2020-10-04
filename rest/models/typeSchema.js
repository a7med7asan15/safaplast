const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const Schema = mongoose.Schema;


const typeSchema = new Schema({
    name:{type:String,required:true},
})

typeSchema.plugin(mongoosePaginate);

const TypeSchema =  mongoose.model('typeSchema', typeSchema);

module.exports = TypeSchema