const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const Schema = mongoose.Schema;

const variantsSchema  = new Schema({
    nameArabic:{ type: String, required: true},
    nameEnglish:{ type: String, required: true},
    parentType:{ type : Schema.Types.ObjectId , ref : 'typesSchema' },
    parenClass:{ type : Schema.Types.ObjectId , ref : 'classSchema' }
})

const classSchema = new Schema({
    nameArabic:{ type: String, required: true},
    nameEnglish:{ type: String, required: true},
})

const typesSchema  = new Schema({

    nameArabic:{ type: String, required: true},
    nameEnglish:{ type: String, required: true},
    variants : [{ type : Schema.Types.ObjectId , ref : 'variantsSchema' }]
    
})

typesSchema.plugin(mongoosePaginate);
variantsSchema.plugin(mongoosePaginate);
classSchema.plugin(mongoosePaginate);

const TypesSchema =  mongoose.model('typesSchema', typesSchema);
const VariantsSchema =  mongoose.model('variantsSchema', variantsSchema);
const ClassSchema =  mongoose.model('classSchema', classSchema);

module.exports ={
    TypesSchema,
    VariantsSchema,
    ClassSchema
}