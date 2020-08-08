const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const Schema = mongoose.Schema;



const quantitySizeSchema  = new Schema({
    sizeId: { type : Schema.Types.ObjectId , ref : 'sizeSchema' },
    allQuantity:{ type : Number , required: true },
    quantityNow:{ type : Number , required: true },    
})

const productColorSchema  = new Schema({
    aiProductId:{type:String},
    colorId: { type : Schema.Types.ObjectId , ref:'colorSchema'},
    image:{type:String,required:true},
    filename:{type:String,required:true},
    colorSizes:[quantitySizeSchema]
})

const productSchema  = new Schema({
    name:{ type: String, required: true},
    sku:{type:String,required: true},
    classId: { type : Schema.Types.ObjectId , ref:'classSchema'},
    typeId: { type : Schema.Types.ObjectId , ref:'typesSchema'},
    varId: { type : Schema.Types.ObjectId , ref:'variantsSchema'},
    storeId:{ type : Schema.Types.ObjectId , ref:'storeSchema'},
    buyPrice : {type:Number ,required:true},
    sellPrice : {type:Number ,required:true},
    totalBuyPrice : {type:Number },
    status : {type:String ,required:true},
    productColors:[productColorSchema]
})



productSchema.plugin(mongoosePaginate);

const ProductSchema =  mongoose.model('productSchema', productSchema);
const ProductColorSchema =  mongoose.model('productColorSchema', productColorSchema);
const QuantitySizeSchema =  mongoose.model('quantitySizeSchema', quantitySizeSchema);


  
module.exports ={
    ProductSchema,
    ProductColorSchema,
    QuantitySizeSchema
}