const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');



const Schema = mongoose.Schema;

const areaSchema  = new Schema({
    nameEnglish  :  { type: String, required: true},
    nameArabic  :  { type: String , required: true},
    parent  :  { type : Schema.Types.ObjectId , ref : 'citySchema' },
})


const citySchema  = new Schema({
    nameEnglish :  { type: String , required: true},
    nameArabic  :  { type: String , required: true},

})

citySchema.plugin(mongoosePaginate);
areaSchema.plugin(mongoosePaginate);

const CitySchema =  mongoose.model('citySchema', citySchema);
const AreaSchema =  mongoose.model('areaSchema', areaSchema);

module.exports ={
    CitySchema,
    AreaSchema,
}
// const firstCategory = new CategoryParentSchema({name:'Shoes'})
// firstCategory.childCategory.push({name:"Leather Shoes"})
// firstCategory.save();
