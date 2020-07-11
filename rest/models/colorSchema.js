const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const colorSchema  = new Schema({
    name:{ type: String, required: true},
    colorHex:{type:String , required :true}

})


module.exports = mongoose.model('colorSchema', colorSchema);