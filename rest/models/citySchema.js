const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const areaSchema  = new Schema({
    name:{ type: String, required: true},
})


const citySchema  = new Schema({
    name:{ type: String, required: true},
    childAreas :[categorySchema]

})

const CitySchema =  mongoose.model('citySchema', citySchema);
const AreaSchema =  mongoose.model('areaSchema', areaSchema);

// const firstCategory = new CategoryParentSchema({name:'Shoes'})
// firstCategory.childCategory.push({name:"Leather Shoes"})
// firstCategory.save();

module.exports ={
    CitySchema,
    AreaSchema
}