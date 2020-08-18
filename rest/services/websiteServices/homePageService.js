

const homePageService ={
    show: async (req,res)=>{
        res.render('site/listingPage', { title: 'Hey', message: 'Hello there!' })
    },
    action: async ( req,res ) => {
        
    },
    destroy: async (req , res )=>{
        req.session.destroy(()=>{
            res.redirect('/dashboard/login')
        })  
    }
}

module.exports = homePageService