const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: '69746b34',
  apiSecret: 'zmoKDcdS1kudYpWb',
});


const sendSms =(pin,mobilNo)=>{

    let from = 'Corona-Scan';
    let to = '2' + mobilNo;
    let text = 'Your Pin Is ' + pin;
    const data =  nexmo.message.sendSms(from, to, text);
    return data ;
 
  

}



module.exports = sendSms;
    



