
const PropertySchema = require('../../models/propertySchema');
const {TypesSchema,RoomsSchema} = require('../../models/categorySchema');
const {AreaSchema} = require('../../models/citySchema');
const AmentiesSchema = require('../../models/amentiesSchema');

const homePageService ={
    
    show : async(req,res)=>{
        return res.redirect('/search');
    },
    showSearch: async (req,res)=>{
        try{
            let page = 1;
            let limit = 1;
            let typesQuery = [];
            let roomsQuery = [];
            let amentiesQuery = [];
            let priceQuery=100
            let areaQuery = [];
            let domainName = process.env.devDomain
            if(process.env.STATUS === "PROD" ){
                domainName = process.env.hostDomain
            }
            const query = {
                status:'active'    
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
                query.price = { $lte: parseInt(priceQuery)};
            }
            if(req.query.area){
                areaQuery = req.query.area
                query.areaId = areaQuery
            }
            if(req.query.amenties){
                amentiesQuery = req.query.amenties
                query.amenties = amentiesQuery
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
            const amen = await AmentiesSchema.find();
            console.log(query)
            const minmumPriceRange = await PropertySchema.find().sort({price:1}).limit(1);
            console.log(data)
            const minPrice = minmumPriceRange[0].price;
            res.render('site/listingPage', { 
            title: ' باب دهب - اجر شقة فى دهب باليوم بأرخص الأسعار', 
            metDescription: 'شقق فى دهب بأرخص الأسعار دور على شقة باليوم فى دهب ', 
            ogTitle: 'شقق فى دهب بأرخص الأسعار دور على شقة باليوم فى دهب ', 
            ogDomain: domainName, 
            data ,
            types,
            areas,
            rooms,
            typesQuery,
            roomsQuery,
            priceQuery,
            areaQuery,
            amentiesQuery,
            csrfToken,
            minPrice,
            amen
        })
             
        }catch(err){
            console.log(err);

        }

    },
    showOneProduct:async(req,res)=>{
        try{
            const {slug} = req.params;
            let csrfToken = req.csrfToken();
            const property = await PropertySchema.findOne({slugArabic:slug}).populate(['type','areaId','amenties'])
            const relatedProducts = await PropertySchema.find({price:{$lte:property.price}}).limit(4).select(['slugArabic','nameArabic','images']);
            property.views = property.views  + 1;
            await property.save();
             return res.render('site/page', { title: 'ميرنا دهب || Merna Dahab' , property :property,csrfToken,relatedProducts})
        }catch(err){
            console.log(err);
            return res.send(err);

        }
    },
    loadMore:async(req,res)=>{
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
               
                    const options = {
                        page,
                        limit: 10,
                        populate:"rooms type areaId"
                    }
                const data = await PropertySchema.paginate(query,options);
                console.log(data)
                res.json({err:false,data})
                
        }catch(err){
            console.log(err);
            res.json({err:true})
        }
    }

}

module.exports = homePageService