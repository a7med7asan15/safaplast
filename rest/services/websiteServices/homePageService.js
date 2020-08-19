
const PropertySchema = require('../../models/propertySchema');
const {TypesSchema,RoomsSchema} = require('../../models/categorySchema');
const {AreaSchema} = require('../../models/citySchema');
const homePageService ={
    
    show : async(req,res)=>{
        try{
            let query = {};
            let page = 1;
            let limit = 1;
            let typesQuery = [];
            let roomsQuery = [];
            let areaQuery = [];
            let priceQuery=100
            if (req.query.p) {
                page = parseInt(req.query.p, 10)

            }  
             const options = {
                page,
                limit: 10,
                populate:"rooms type areaId"
            }
            let csrfToken = req.csrfToken();
            const data = await PropertySchema.paginate(query,options);
            const types = await TypesSchema.find();
            const rooms = await RoomsSchema.find();
            const areas = await AreaSchema.find();
            res.render('site/listingPage', { title: 'ميرنا دهب || Merna Dahab', 
            data ,
            types,
            areas,
            rooms,
            typesQuery,
            roomsQuery,
            priceQuery,
            csrfToken,
            areaQuery
        })
        }catch(err){
            console.log(err);
            res.send(err);
        }
    },
    showSearch: async (req,res)=>{
        try{
            let page = 1;
            let limit = 1;
            let typesQuery = [];
            let roomsQuery = [];
            let priceQuery=100
            let areaQuery = [];
            const query = {
                    
            }
            if (req.query.p) {
                page = parseInt(req.query.p, 10)

            }
            if (req.query.type) {
                typesQuery = req.query.type; 
                query.type = typesQuery;
            }
            if(req.query.room){
                roomsQuery = req.query.room
                query.rooms = roomsQuery;
            }
            if(req.query.price){
                priceQuery = req.query.price
                query.price = { $lte: priceQuery};
            }
            if(req.query.area){
                areaQuery = req.query.area
                query.areaId = areaQuery
            }

            let csrfToken = req.csrfToken();
       
                const options = {
                    page,
                    limit: 10,
                    populate:"rooms type areaId"
                }
            const data = await PropertySchema.paginate(query,options);
            const types = await TypesSchema.find();
            const rooms = await RoomsSchema.find();
            const areas = await AreaSchema.find();
                
            res.render('site/listingPage', { title: 'ميرنا دهب || Merna Dahab', 
            data ,
            types,
            areas,
            rooms,
            typesQuery,
            roomsQuery,
            priceQuery,
            areaQuery,
            csrfToken
        })
             
        }catch(err){
            console.log(err);

        }

    },
    action: async ( req,res ) => {     
    },
    destroy: async (req , res )=>{
        req.session.destroy(()=>{
            res.redirect('/dashboard/login')
        })  
    },
    showOneProduct:async(req,res)=>{
        try{
            const {slug} = req.params;
            console.log(slug)
            const property = await PropertySchema.findOne({slugArabic:slug})
            console.log(property)
             return res.render('site/page', { title: 'ميرنا دهب || Merna Dahab' , property :property})
        }catch(err){
            return res.send(err);

        }
    }
}

module.exports = homePageService