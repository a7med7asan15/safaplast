const PropertySchema = require('../models/propertySchema');
const OrdersSchema = require('../models/ordersSchema');
const {AmentiesSchema} = require('../models/amentiesSchema');
const User  = require('../models/Users');
const {CategoryParentSchema}  = require('../models/categorySchema');
const orderid = require('order-id')('dahabdoor')

const property = {
    createdby:'5f38a24c57edb10938c03a97',
    status:'active',
    nameEnglish:'Seaview 400 m Awesome Studio ',
    nameArabic:'ستديو 400 متر عالبحر',
    type:'5f3c3799817d712a740c9002',
    rooms:'5f3c25bbd62ce36ff8687d32',
    mobileNumber:'01021257331',
    amenties:[
        '5f41122649f4a71c04eeb470',
        '5f41122649f4a71c04eeb471'
    ],
    cityId:'5f38b33930b1825c6402aea5',
    areaId:'5f38b35030b1825c6402aea6',
    Address:{
        desriptionArabic:'هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم، ولكن الغالبية تم تعديلها بشكل ما عبر إدخال بعض النوادر أو الكلمات العشوائية إلى النص. إن كنت تريد أن تستخدم نص لوريم إيبسوم ما، عليك أن تتحقق أولاً أن ليس هناك أي كلمات أو عبارات محرجة أو غير لائقة مخبأة في هذا النص. بينما تعمل جميع مولّدات نصوص لوريم إيبسوم على الإنترنت على إعادة تكرار مقاطع من نص لوريم إيبسوم نفسه عدة مرات بما تتطلبه الحاجة، يقوم مولّدنا هذا باستخدام كلمات من قاموس يحوي على أكثر من 200 كلمة لا تينية، مضاف إليها مجموعة من الجمل النموذجية، لتكوين نص لوريم إيبسوم ذو شكل منطقي قريب إلى النص الحقيقي. وبالتالي يكون النص الناتح خالي من التكرار، أو أي كلمات أو عبارات غير لائقة أو ما شابه. وهذا ما يجعله أول مولّد نص لوريم إيبسوم حقيقي على الإنترنت.',
        descriptionEnglish:'asdasdasdasasdasdas',
    },
    images:[
        {
            imageLink:'https://mirnadahab.storage.googleapis.com/16820b20-e24a-11ea-86d0-4d8d358559b8_3.jpg'
        },
        {
            imageLink:'https://mirnadahab.storage.googleapis.com/f0ec1210-e277-11ea-9d81-19eb5283591a_4.jpg'
        }
    ]
}

const order = {
    checkIn : "08-20-20 ",
    checkOut : "08-20-20 ",
    adults:"3",
    child:"2",
    nameCustomer:"Mohamed",
    customerMobileNo:"01021257331",
    propertyId:"5f3faf42b3b9072d5cd8bbc3"
}

const amenties = [
    {
        nameArabic : 'مكيف ',
        nameEnglish: 'Air Contitioned',
        icon:'7'
    },
    {
        nameArabic : 'انترنت ',
        nameEnglish: 'Wifi',
        icon:'4'
    },
    {
        nameArabic : 'مطل على البحر ',
        nameEnglish: 'Sea view',
        icon:'10'
    },

]


const seedProperty = async  ()=>{
    const counted = await PropertySchema.count({});
    if(counted === 0){
        for(i=0 ; i < 5 ; i++){
            if (i === 0 ){
                   property.price = 600;  
            }else{

                property.price = parseInt(i + "00");
            }
            let  propertySeeds = new PropertySchema(property);
            await propertySeeds.save();
        }
        console.log('property Seeded');
    }
 
}

const seedOrders = async()=>{
    const counted = await OrdersSchema.count({});
    if(counted === 0  ){
        for(i=0 ; i <50 ; i++){
             order.orderId =  orderid.generate().split('-').join('');     
            let  ordersSeed = new OrdersSchema(order);
            await ordersSeed.save();
        }
        console.log('Orders Seeded');
    }
}
const seedAmenties = async () => {
    const counted = await AmentiesSchema.count({});
    if(counted === 0){

        for(i=0;i < amenties.length ; i++){
            
            const amen = AmentiesSchema({
                nameArabic: amenties[i].nameArabic,
                nameEnglish: amenties[i].nameEnglish,
                icon: amenties[i].icon
            })
            amen.save();
        }
    }
}
const seedUser = async ()=>{

   const user = await User.count({});
   if(!user){
       const newUser = new User({
        index:'1',
        username: 'Admin',
        email:'info@dahabdoors.com',
        pin: 'The12345..',
        role:0
       })
      await newUser.save()
      return console.log('Created New User admin@admin.com , 1234') 
    }
    return console.log('User Already There') 

}


module.exports = {seedProperty,seedUser,seedOrders,seedAmenties};