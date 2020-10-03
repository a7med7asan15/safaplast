const mongoose = require('mongoose');


const Schema = mongoose.Schema;



const settingSchema = new Schema({
    linkedin :  { type: String , required: true},
    youtube :  { type: String , required: true},
    facebook :  { type: String , required: true},
    catalog :  { type: String , required: true},
})

const SettingSchema =  mongoose.model('settingSchema', settingSchema);

module.exports = {SettingSchema}