const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const categorySchema  = new Schema({
    name:{ type: String, required: true},
})


const categoryParentSchema  = new Schema({
    name:{ type: String, required: true},
    childCategory :[categorySchema]

})

const CategoryParentSchema =  mongoose.model('categoryParentSchema', categoryParentSchema);
const CategorySchema =  mongoose.model('categorySchema', categorySchema);



// const firstCategory = new CategoryParentSchema({name:'Shoes'})
// firstCategory.childCategory.push({name:"Leather Shoes"})
// firstCategory.save();

module.exports ={
    CategoryParentSchema,
    CategorySchema
}