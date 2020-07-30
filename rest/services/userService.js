const User = require('../models/Users');
const _ = require('lodash');
const { isError } = require('lodash');


const userService ={

    listAll:async (req,res) =>{
        try{
           
            const users = await User.find({})
            let csrfToken =  req.csrfToken();
            return res.render('screens/usersScreens/listAllScreen',{users,thisUser:req.user,csrfToken})
        }catch(err){
            req.flash('error', 'Something Went wrong')
            return res.render('screens/usersScreens/listAllScreen')
        }

    },
    showOne: async(req,res) =>{
        req.session.lastlink = req.url
        let csrfToken =  req.csrfToken();
        try{
            var {userId} = req.params
            const userToEdit = await User.findById(userId);   
            return res.render('screens/usersScreens/editUserScreen', { thisUser:req.user ,userToEdit:userToEdit, csrfToken })
        }catch(err){
            req.flash('error', 'Something Went wrong')
            return res.render('screens/usersScreens/editUserScreen', { thisUser:req.user ,userToEdit:{}, csrfToken })
        }

    },
    showAdd: async (req,res)=>{
    
        let passedData = false
        if(req.session.passedData){
            passedData = req.session.passedData
        }
        let csrfToken =  req.csrfToken();
        return res.render('screens/usersScreens/addUserScreen', { thisUser:req.user , csrfToken ,sessionData:passedData})
    },
    create: async ( req , res ) => {
        const {username,email,password,mobilenumber,userrole }  = req.body
        let filename = ''; 
        
        if(req.file){
         filename = req.file.filename;
        }
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
            req.session.passedData = false 
            req.flash('success', 'user Added Succesfully')
            return res.redirect('/dashboard/users/add')
        }catch(err){
            req.flash('error', 'Something Went wrong')
           return res.redirect('/dashboard/users/add')
        }
        },
    update: async (req , res )=>{
        const {username,email,mobilenumber,userrole } = req.body
        const {userId} = req.params 
        try{
            const updateuser = await User.findById(userId)
            updateuser.username = username,
            updateuser.email = email,
            updateuser.mobileNo = mobilenumber,
            updateuser.role = userrole
            await updateuser.save();
            req.session.passedData = false 
            req.flash('success', 'User Updated Succesfully')
            return res.redirect(`/dashboard/users/edit/${userId}`)
        }catch(err){
            req.flash('error', {message:'Something Went wrong'})
           return res.redirect(`/dashboard/users/edit/${userId}`)
        }

    },
    destroy: async (req , res )=>{
        const {userId} = req.params;
       try{
            const deleteUser =  await User.findByIdAndDelete(userId);
            req.flash('success', `${deleteUser.name} Deleted Successfully`)
            return res.redirect(`/dashboard/users`)
       }catch(err){
        req.flash('error', {message:'Something Went wrong'})
        return res.redirect(`/dashboard/users`)

       }
    },
    showPassword: async(req,res)=>{
        let csrfToken =  req.csrfToken();
        const  {userId} = req.params
        const userToEdit = await User.findById(userId); 
        return res.render('screens/usersScreens/changePasswordScreen', { thisUser:req.user ,userToEdit, csrfToken })
    },
    changePassword: async(req,res)=>{
        var {userId} =req.params;
        var {oldpassword, newpassword } = req.body;


        try{

            const userToEdit = await User.findById(userId);
            const oldPasswordCheck = await userToEdit.comparePassword(oldpassword)
            if(!oldPasswordCheck){
                req.flash('error', {message:'Wrong old Password '})
                return res.redirect(`/dashboard/users/edit/${userId}/changepassword`)
            }
            userToEdit.password  = newpassword
            await  userToEdit.save() 
            req.flash('success', 'User Updated Succesfully')
            return res.redirect(`/dashboard/users/edit/${userId}/changepassword`)

        }catch(err){
            req.flash('error', {message:'Something Went wrong'})
            return res.redirect(`/dashboard/users/edit/${userId}/changepassword`)
        }
    },
    searchUser : async (req,res)=>{
            try{
             
            const user = await User.find(
                
                {
                    email:{$regex : req.body.email} 
                
                }, 'username' );
            
            return res.send({results:user})
            
            }catch(err){

                return  res.send(err);
            }


    },
    searchShowUser: async (req, res) => {
        try {
            let csrfToken = req.csrfToken();
            const {
                table_search,
            } = req.body;
            const tbSearch = await User.find({
                "$or": [
                    { username: { '$regex': table_search, '$options': 'i' } },
                    { email: { '$regex': table_search, '$options': 'i' } }
                ]
            });
            return res.render('screens/usersScreens/listAllScreen', {
                thisUser: req.user,
                csrfToken,
                table_search,
                tbSearch
            })

        } catch (err) {

            req.flash('error', 'Something Went wrong')
            return res.render('screens/usersScreens/listAllScreen', {
                thisUser: req.user,
                table_search,
                tbSearch:{},
                csrfToken
            })
        }


    }


}

module.exports = userService