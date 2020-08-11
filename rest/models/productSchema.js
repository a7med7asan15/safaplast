const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const Schema = mongoose.Schema;



const quantitySizeSchema  = new Schema({
    sizeId: { type : Schema.Types.ObjectId , ref : 'sizeSchema' },
    allQuantity:{ type : Number , required: true },
    quantityNow:{ type : Number ,default:0}, 
    soldQuantity:{ type : Number ,default:0 },
    status:{type:String,default:'active'}   
})

const productColorSchema  = new Schema({
    aiProductId:{type:String},
    status:{type:String,default:'active'},
    aiProductStatus:{type:String , default :'pending'},
    colorId: { type : Schema.Types.ObjectId , ref:'colorSchema'},
    image:{type:String,required:true},
    filename:{type:String,required:true},
    activeSizes:{type:Number,default:0},
    colorSizes:[quantitySizeSchema]
})

const productSchema  = new Schema({
    name:{ type: String, required: true},
    aiStatus:{type:String,default:'unlinked'},
    sku:{type:String,required: true},
    classId: { type : Schema.Types.ObjectId , ref:'classSchema'},
    typeId: { type : Schema.Types.ObjectId , ref:'typesSchema'},
    varId: { type : Schema.Types.ObjectId , ref:'variantsSchema'},
    storeId:{ type : Schema.Types.ObjectId , ref:'storeSchema'},
    buyPrice : {type:Number ,default:0},
    sellPrice : {type:Number ,default:0},
    totalQuantity : {type:Number , default:0},
    pieceBuyPrice : {type:Number , default:0},
    status : {type:String ,default:'active'},
    review:{type:String , default:'pending'},
    productColorsCount: {type:Number , default:0},
    sizesCount:{type:Number, default:0},
    productColors:[productColorSchema]
})



productSchema.pre('save', function(next) {
    const {productColors} = this
    let activeProductColors = 0 ;
    let totalProductQuantity = 0;
    productColors.forEach((color)=>{
        if(color.status === "active"){
            activeProductColors++
            color.colorSizes.forEach((size)=>{
                totalProductQuantity = totalProductQuantity + parseInt(size.allQuantity)
    
            })
        }
      
    }) 
    this.productColorsCount = activeProductColors;
    this.totalQuantity = totalProductQuantity;
    let total = parseInt(this.buyPrice) / parseInt(this.totalQuantity) ;
    this.pieceBuyPrice = total.toFixed(2);
    next();
});

quantitySizeSchema.pre('save',function(next){
    this.quantityNow = this.allQuantity - this.soldQuantity;
    next();
});
productColorSchema.pre('save',function(next){
    const {colorSizes} = this
    let activeSize = 0;
    colorSizes.forEach((size)=>{
        if(size.status === 'active'){
            activeSize++
        }
    })
    this.activeSizes = activeSize;

    next();
});

productSchema.plugin(mongoosePaginate);

const ProductSchema =  mongoose.model('productSchema', productSchema);
const ProductColorSchema =  mongoose.model('productColorSchema', productColorSchema);
const QuantitySizeSchema =  mongoose.model('quantitySizeSchema', quantitySizeSchema);


  
module.exports ={
    ProductSchema,
    ProductColorSchema,
    QuantitySizeSchema
}