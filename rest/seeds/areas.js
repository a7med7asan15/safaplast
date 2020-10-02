const User  = require('../models/Users');



const seedUser = async ()=>{

   const user = await User.count({});
   if(!user){
       const newUser = new User({
        index:'1',
        username: 'الحساب الأساسي',
        email:'admin@admin.com',
        pin: '1234',
        role:0
       })
      await newUser.save()
      return console.log('Created New User admin@admin.com , 1234') 
    }
    return console.log('User Already There') 

}


module.exports = {seedUser};