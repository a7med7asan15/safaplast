const mongoose = require('mongoose');

const AreasSchema = mongoose.Schema({
  name:{ type: String, required: true},
  no:{type:Number,required:true}
});

module.exports = mongoose.model('AreasModel', AreasSchema);