const _ = require('lodash');


const contactService = {

    show: async(req,res)=>{
        let csrfToken = req.csrfToken();
        try{
            return res.render('screens/contactScreens/messages', {
                thisUser: req.user,
                csrfToken,
            })
        }catch(err){
            console.log(err);
            res.send(err);
        }
    },
}
    
module.exports = contactService