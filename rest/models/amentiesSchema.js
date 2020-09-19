const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const amentiSchema = new Schema({
      nameArabic:{type:String,required:true},  
      nameEnglish:{type:String,required:true},  
      icon:{type:String,required:true}  



})
amentiSchema.plugin(mongoosePaginate);
const AmentiesSchema =  mongoose.model('amentiSchema', amentiSchema);

module.exports = {AmentiesSchema}; 