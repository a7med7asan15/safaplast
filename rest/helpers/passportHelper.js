const User = require('../models/Users');


const helpers = {
    getUserById : function(id,cb){
        User.findById(id,cb);
        
        }



}

module.exports = helpers
