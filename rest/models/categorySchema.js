const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const Schema = mongoose.Schema;

const roomsSchema  = new Schema({
    nameArabic:{ type: String, required: true},
    nameEnglish:{ type: String, required: true},

})

const typesSchema = new Schema({
    nameArabic:{ type: String, required: true},
    nameEnglish:{ type: String, required: true},
})



typesSchema.plugin(mongoosePaginate);
roomsSchema.plugin(mongoosePaginate);

const TypesSchema =  mongoose.model('typesSchema', typesSchema);
const RoomsSchema =  mongoose.model('roomsSchema', roomsSchema);

module.exports ={
    TypesSchema,
    RoomsSchema,
}