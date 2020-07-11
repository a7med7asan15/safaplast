const Areas = require('../models/Areas')
const User  = require('../models/Users');
const {CategoryParentSchema}  = require('../models/categorySchema');


const areas = [

    {value:1 ,title:'القاهرة' },
    {value:2 ,title:'الأسكندرية' },
    {value:3 ,title:'بورسعيد' },
    {value:4 ,title:'السويس' },
    {value:5 ,title:'6 اكتوبر ' },
    {value:6 ,title:'دمياط' },
    {value:7 ,title:'الدقهلية' },
    {value:8 ,title:'الشرقية' },
    {value:9 ,title:'القليوبيه' },
    {value:10 ,title:'كفر الشيخ' },
    {value:11 ,title:'الغربية' },
    {value:12 ,title:'المنوفية' },
    {value:13 ,title:'البحيرة' },
    {value:14 ,title:'الاسماعيلية' },
    {value:15 ,title:'الجيزة' },
    {value:16 ,title:'بنى سويـف' },
    {value:17 ,title:'الفيوم' },
    {value:18 ,title:'المنيا' },
    {value:19 ,title:'اسيوط' },
    {value:20 ,title:'سوهاج' },
    {value:21 ,title:'قنا' },
    {value:22 ,title:'أسوان' },
    {value:23 ,title:'الاقصر' },
    {value:24 ,title:'البحر الاحمر' },
    {value:25 ,title:'الوادى الجديد' },
    {value:26 ,title:'مطروح' },
    {value:27 ,title:'شمال سيناء' },
]


const seedAreas = ()=>{

 
    areas.forEach(ar =>{
        const gove = new Areas({
            name:ar.title,
            no :ar.value
        })
        gove.save()
        
    })
}

const seedUser = async ()=>{
    // const fin = await CategoryParentSchema.findOne({ 'childCategory._id' : '5f09ab1d2dbd1c53e0d16c12' });
    // console.log(fin);
   const user =  await User.findOne({email:'admin@admin.com'})
   if(!user){
       const newUser = new User({
        firstname: 'Mohamed',
        lastname: 'Hussam',
        email:'admin@admin.com',
        pin: '1234',
        role:0
       })
      await newUser.save()
      return console.log('Created New User admin@admin.com ,1234') 
    }
    return console.log('User Already There') 

}


module.exports = {seedAreas,seedUser};