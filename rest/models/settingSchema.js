const mongoose = require('mongoose');


const Schema = mongoose.Schema;



const settingSchema = new Schema({
    linkedin :  { type: String },
    youtube :  { type: String },
    facebook :  { type: String },
    catalog :  { type: String },
    dTimes : { type: Number , default: 0},
    logo:{ type: String },
    favicon:{ type: String },
})

const SettingSchema =  mongoose.model('settingSchema', settingSchema);

module.exports = SettingSchema