const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');


const Schema = mongoose.Schema;

const images = new Schema({
    imageLink : { type : String }
})
const propertySchema  = new Schema({
    createdby:{  type : Schema.Types.ObjectId , ref : 'UsersModel' } ,
    status:{type:String,default:'active'},
    nameEnglish:{ type : String, required: true} ,
    nameArabic:{ type : String, required: true} ,
    slugEnglish:{ type: String, slug: ["nameEnglish"], slug_padding_size: 4,  unique: true } ,
    slugArabic:{ type: String, slug: ["nameArabic"], slug_padding_size: 4,  unique: true } ,
    mobileNumber:{ type : String } ,
    type:{  type : Schema.Types.ObjectId , ref : 'typesSchema' } ,
    rooms:{  type : Schema.Types.ObjectId , ref : 'roomsSchema' } ,
    price:{ type : Number } ,
    sku:{ type : String , required:true } ,
    images:[images] ,
    amenties:[{ type : Schema.Types.ObjectId , ref : 'amentiSchema' }],
    brokers:[{ type : Schema.Types.ObjectId , ref : 'brokerSchema' }],
    cityId: { type : Schema.Types.ObjectId , ref : 'citySchema' } ,
    areaId: { type : Schema.Types.ObjectId , ref : 'areaSchema' } ,
    Address: {
        desriptionArabic : { type : String } ,
        descriptionEnglish : { type : String } ,
    },
    views: { type : Number ,default:0} , 
    orders: { type : Number ,default:0 } 
})


// propertySchema.pre('save', async (next)=> {
    //     try{
        
        //         let slugBaseEnglish = this.nameEnglish.split(' ');
        //         slugBaseEnglish = slugBaseEnglish.join('-');
        
        //         let slugBaseArabic =  this.nameArabic.split(' ');   
        //         slugBaseArabic = slugBaseArabic.join('-');    
        //         this.slugArabic = slugBaseArabic
        //         next()
        //     }catch(err){
            //         console.log(err)
            //     }
            
            // })
            
            propertySchema.plugin(slug,{
                lang: "ar",
            }),
            propertySchema.plugin(mongoosePaginate);
            const PropertySchema = mongoose.model('propertySchema', propertySchema);


module.exports = PropertySchema
