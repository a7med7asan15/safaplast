const User = require('../models/Users');
const _ = require('lodash');


const authService ={
    show: async (req,res)=>{
        res.render('screens/authScreens/loginScreen', { title: 'Hey', message: 'Hello there!' })
    },
    action: async ( req,res ) => {
        
    },
    destroy: async (req , res )=>{
        req.session.destroy(()=>{
            res.redirect('/dashboard/login')
        })  
    }
}

module.exports = authService