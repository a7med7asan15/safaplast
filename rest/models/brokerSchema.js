const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const brokerSchema = mongoose.Schema({
    name: { type: String, required: true},
    mobileNo:{ type: String},
});

brokerSchema.plugin(mongoosePaginate);

const BrokerSchema = mongoose.model('brokerSchema', brokerSchema);

module.exports = BrokerSchema

