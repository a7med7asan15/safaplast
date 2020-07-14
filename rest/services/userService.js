const User = require('../models/Users');
const _ = require('lodash');


const userService ={
    listAll:async (req,res) =>{
        try{
           
            const users = await User.find({})
            return res.render('screens/usersScreens/listAllScreen',{users,thisUser:req.user})
        }catch(err){
            req.flash('error', 'Something Went wrong')
            return res.render('screens/usersScreens/listAllScreen')
        }

    },
    showOne: async(req,res) =>{
        let csrfToken =  req.csrfToken();
        try{
            console.log(req.params)
            var {userId} = req.params
            const userToEdit = await User.find({_id: userId});   
            console.log(userToEdit[0])
            return res.render('screens/usersScreens/editUserScreen', { thisUser:req.user ,userToEdit:userToEdit[0], csrfToken })
        }catch(err){
            req.flash('error', 'Something Went wrong')
            return res.render('screens/usersScreens/editUserScreen', { thisUser:req.user ,userToEdit:{}, csrfToken })
        }

    },
    showAdd: async (req,res)=>{
        let csrfToken =  req.csrfToken();
        return res.render('screens/usersScreens/addUserScreen', { thisUser:req.user , csrfToken })
    },
    create: async ( req , res ) => {
        const {username,email,password,mobilenumber,userrole }  = req.body
        const {filename} = req.file;

        try{
            const count = await User.count()
            const newuser = await User({
                index:count + 1 ,    
                username,           
                email,
                pin: password,
                mobileNo:mobilenumber,
                role:userrole,
                avatar:filename
            })
            
            await newuser.save();
            req.flash('success', 'user Added Succesfully')
            return res.redirect('/dashboard/users/add')
        }catch(err){
            req.flash('error', 'Something Went wrong')
           return res.redirect('/dashboard/users/add')
        }
        },
    update: async (req , res )=>{
   
    },
    destroy: async (req , res )=>{
   
    }
}

module.exports = userService