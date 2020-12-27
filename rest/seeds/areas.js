const SettingSchema = require('../models/settingSchema');
const User  = require('../models/Users');



const seedUser = async ()=>{

   const user = await User.count({});
   if(!user){
       const newUser = new User({
        index:'1',
        username: 'الحساب الأساسي',
        email:'info@elsafaplastelec.com',
        pin: '$$Elsafa2020',
        role:0
       })
      await newUser.save()
      return console.log('Created New User admin@admin.com , 1234') 
    }
    return console.log('User Already There') 

}

const seedSetting = async ()=>{

  const setting = await SettingSchema.count({});
  if(!setting){
      const newSetting = new SettingSchema({
       linkedin:'#',
       facebook: '#',
       youtube:'#',
       instagram:'#',
       catalog: '#',
       logo:'#', 
       favicon:"#"
      })
     await newSetting.save()
     return console.log('Created New Settings') 
   }
}


module.exports = {seedUser, seedSetting};