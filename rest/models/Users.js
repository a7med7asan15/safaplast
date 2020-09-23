const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const UsersSchema = mongoose.Schema({
    index:{type:String,required:true},
    username: { type: String, required: true},
    email:{type:String,required:true},
    pin: { type: String, required: true},
    mobileNo:{ type: String},
    gender: { type: String, lowercase: true},
    role:{type:Number,default:1},
    avatar:{type:String, default:"https://via.placeholder.com/150"},
    stores:[{ type : Schema.Types.ObjectId , ref:'storeSchema'}]
});

UsersSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('pin')) return next();

    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.pin, salt, null, function(err, hash) {
        if (err) return next(err);
        user.pin = hash;
        next();
      });
    });
  });

  UsersSchema.methods.comparePassword = async function(pin) {
  try{
    var result = await bcrypt.compareSync(pin, this.pin);
    console.log(result)
   return result;
  }catch(err){
    throw new Error(error)
  }
  }
  UsersSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('UsersModel', UsersSchema);

