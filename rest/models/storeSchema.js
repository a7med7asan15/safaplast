const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const storeSchema  = new Schema({
    storeEnglish:{ type: String, required: true},
    storeArabic:{ type: String, required: true},
    image:{type:String},
    storeMobile:{type:String},
    Address:{
        city :{String},
        cityId: { type : Schema.Types.ObjectId , ref : 'citySchema' },
        area:{String},
        areaId: { type : Schema.Types.ObjectId , ref : 'areaSchema' },
        specificAddress : {type:String}
    },
    views:{type:Number}, 
    clicks:{type:Number},
    Products: [{ type : Schema.Types.ObjectId , ref : 'productSchema' }],
    storeOwner : { type : Schema.Types.ObjectId , ref : 'UsersModel' }
})

const StoreSchema =  mongoose.model('storeSchema', storeSchema);


module.exports = StoreSchema
