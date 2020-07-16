const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');



const Schema = mongoose.Schema;

const areaSchema  = new Schema({
    name  :  { type: String, required: true},
})


const citySchema  = new Schema({
    nameEnglish :  { type: String , required: true},
    nameArabic  :  { type: String , required: true},
    childAreas  :  [areaSchema]

})

citySchema.plugin(mongoosePaginate);
areaSchema.plugin(mongoosePaginate);

const CitySchema =  mongoose.model('citySchema', citySchema);
const AreaSchema =  mongoose.model('areaSchema', areaSchema);

// const firstCategory = new CategoryParentSchema({name:'Shoes'})
// firstCategory.childCategory.push({name:"Leather Shoes"})
// firstCategory.save();

module.exports ={
    CitySchema,
    AreaSchema
}