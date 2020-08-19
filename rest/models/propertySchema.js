const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const Schema = mongoose.Schema;

const images = new Schema({
   imageLink : { type : String }
})
const propertySchema  = new Schema({
    createdby:{  type : Schema.Types.ObjectId , ref : 'UsersModel' },
    nameEnglish:{ type: String, required: true},
    nameArabic:{ type: String, required: true},
    slugEnglish:{ type: String },
    slugArabic:{ type: String},
    mobileNumber:{type:String},
    type:{  type : Schema.Types.ObjectId , ref : 'typesSchema' },
    rooms:{  type : Schema.Types.ObjectId , ref : 'roomsSchema' },
    price:{type:String},
    images:[images],
    cityId: { type : Schema.Types.ObjectId , ref : 'citySchema' },
    areaId: { type : Schema.Types.ObjectId , ref : 'areaSchema' },
    Address:{
        desriptionArabic : {type:String},
        descriptionEnglish : {type:String},
    },
    
    views:{type:Number}, 
    clicks:{type:Number},
})


propertySchema.pre('save', function(next) {
let slugBaseEnglish = this.nameEnglish.split(' ');
    slugBaseEnglish = slugBaseEnglish.join('-');
let slugBaseArabic =  this.nameArabic.split(' ');   
    slugBaseArabic = slugBaseArabic.join('-');    
    this.slugArabic = slugBaseArabic
    next()

})

propertySchema.plugin(mongoosePaginate);
const PropertySchema = mongoose.model('propertySchema', propertySchema);


module.exports = PropertySchema
