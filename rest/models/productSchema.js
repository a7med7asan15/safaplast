const mongoose = require('mongoose');


const Schema = mongoose.Schema;



const variantSchema  = new Schema({
    size:{ type: String, required: true },
    sizeId: { type : Schema.Types.ObjectId , ref : 'sizeSchema' },
    allQuantity:{ type : Number , required: true },
    quantityNow:{ type : Number , required: true },    
})

const variantGroupSchema  = new Schema({
    color:{ type: String, required: true},
    colorId: { type : Schema.Types.ObjectId , ref:'colorSchema'},
    image:{type:String,required:true},
    variant:[variantSchema]
})

const productSchema  = new Schema({
    name:{ type: String, required: true},
    categoryParent:{type:String , required: true},
    category:{type:String,required:true},
    categoryId: { type : Schema.Types.ObjectId , ref:'categorySchema'},
    buyPrice : {type:Number ,required:true},
    sellPrice : {type:Number ,required:true},
    totalBuyPrice : {type:Number ,required:true },
    status : {type:String ,required:true},
    variantGroup:[variantGroupSchema]
})



const ProductSchema =  mongoose.model('productSchema', productSchema);
const VariantGroupSchema =  mongoose.model('variantGroupSchema', variantGroupSchema);
const VariantSchema =  mongoose.model('variantSchema', variantSchema);


  
module.exports ={
    ProductSchema,
    VariantGroupSchema,
    VariantSchema
}