const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const Schema = mongoose.Schema;

const storeSchema  = new Schema({
    storeOwner: { type : Schema.Types.ObjectId , ref : 'UsersModel' },
    storeEnglish:{ type: String, required: true},
    storeArabic:{ type: String, required: true},
    image:{type:String},
    mobileNumber:{type:String},
    Address:{
        cityId: { type : Schema.Types.ObjectId , ref : 'citySchema' },
        areaId: { type : Schema.Types.ObjectId , ref : 'areaSchema' },
        addressArabic : {type:String},
        addressEnglish : {type:String},
        longtude:{type:String},
        latitude:{type:String},
    },
    views:{type:Number}, 
    clicks:{type:Number},
    //storeOwner : { type : Schema.Types.ObjectId , ref : 'UsersModel' }
})
storeSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('storeSchema', storeSchema)
