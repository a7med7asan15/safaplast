const ProductSchema = require('../../models/productSchema');

const {
    MsgSchema
} = require('../../models/msgSchema');

const homePageService = {

    show: async (req, res) => {
        return res.redirect('/search');
    },
    showSearch: async (req, res) => {
        try {
            let page = 1;
            let limit = 1;
            let typesQuery = [];
            let roomsQuery = [];
            let amentiesQuery = [];
            let priceQuery = 100
            let areaQuery = [];
            let domainName = process.env.devDomain
            if (process.env.STATUS === "PROD") {
                domainName = process.env.hostDomain
            }
            const query = {
                status: 'active'
            }
            if (req.query.p) {
                page = parseInt(req.query.p, 10)

            }
            if (req.query.type) {
                typesQuery = req.query.type;
                query.type = typesQuery;
            }
            if (req.query.room) {
                roomsQuery = req.query.room
                query.rooms = roomsQuery;
            }
            if (req.query.area) {
                areaQuery = req.query.area
                query.areaId = areaQuery
            }
            if (req.query.amenties) {
                amentiesQuery = req.query.amenties
                query.amenties = amentiesQuery
            }
            if (req.query.minValPrice || req.query.maxValPrice) {
                minValPrice = req.query.minValPrice;
                maxValPrice = req.query.maxValPrice;
                query.price = {
                    $gte: minValPrice,
                    $lte: maxValPrice
                }
            }
            let csrfToken = req.csrfToken();

            const options = {
                page,
                limit: 10,
                populate: "rooms type areaId"
            }
            const data = await ProductSchema.paginate(query, options);
            const types = await TypesSchema.find();
            const rooms = await RoomsSchema.find();
            const areas = await AreaSchema.find();
            const amen = await AmentiesSchema.find();
            const minmumPriceRange = await ProductSchema.find().sort({
                price: 1
            }).limit(1);
            const maxPriceRange = await ProductSchema.find().sort({
                price: -1
            }).limit(1);
            let minPrice = 100;
            let maxPrice = 200;
            if (minmumPriceRange.length) {
                minPrice = minmumPriceRange[0].price;
            }
            if (maxPriceRange.length) {
                maxPrice = maxPriceRange[0].price;
            }

            if (req.query.minValPrice) {
                minValPrice = req.query.minValPrice;
            } else {
                minValPrice = minPrice;
            }
            if (req.query.maxValPrice) {
                maxValPrice = req.query.maxValPrice;
            } else {
                maxValPrice = maxPrice;
            }

            res.render('site/listingPage', {
                title: ' باب دهب - اجر شقة فى دهب باليوم بأرخص الأسعار',
                metDescription: 'شقق فى دهب بأرخص الأسعار دور على شقة باليوم فى دهب ',
                ogTitle: 'شقق فى دهب بأرخص الأسعار دور على شقة باليوم فى دهب ',
                ogDomain: domainName,
                data,
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
                maxPrice,
                minValPrice,
                maxValPrice,
                amen
            })

        } catch (err) {

        }

    },
    showOneProduct: async (req, res) => {
        try {
            const {
                slug
            } = req.params;
            let csrfToken = req.csrfToken();
            const property = await ProductSchema.findOne({
                slugArabic: slug
            }).populate(['type', 'areaId', 'amenties', "rooms"])
            const relatedProducts = await ProductSchema.find({
                price: {
                    $lte: property.price
                }
            }).limit(4).select(['slugArabic', 'nameArabic', 'images']);
            property.views = property.views + 1;
            await property.save();
            return res.render('site/page', {
                property: property,
                csrfToken,
                relatedProducts,
                title: property.nameArabic,
                metDescription: property.Address.desriptionArabic,
                ogTitle: property.nameArabic,

            })
        } catch (err) {
            return res.render('site/404.pug')

        }
    },
    loadMore: async (req, res) => {
        try {
            let page = 1;
            let limit = 1;
            let typesQuery = [];
            let roomsQuery = [];
            let priceQuery = 100
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
            if (req.query.room) {
                roomsQuery = req.query.room
                query.rooms = roomsQuery;
            }
            if (req.query.price) {
                priceQuery = req.query.price
                query.price = {
                    $lte: priceQuery
                };
            }
            if (req.query.area) {
                areaQuery = req.query.area
                query.areaId = areaQuery
            }

            const options = {
                page,
                limit: 10,
                populate: "rooms type areaId"
            }
            const data = await ProductSchema.paginate(query, options);
            res.json({
                err: false,
                data
            })

        } catch (err) {
            res.json({
                err: true
            })
        }
    },
    faqPage: async (req, res) => {

        return res.render('site/faq', {
            title: 'الأسئلة الشائعة',
            metDescription: 'اسئلة شائعة عن طريقة تأجير الوحدات فى دهب مع دهب دورز',
            ogTitle: 'اسئلة شائعة عن طريقة تأجير الوحدات فى دهب مع دهب دورز',
        });

    },
    contactPage: async (req, res) => {
        let csrfToken = req.csrfToken();
        return res.render('site/contact', {
            title: 'تواصل معنا',
            metDescription: 'عنوان دهب دورز',
            ogTitle: 'عنوان دهب دورز',
            csrfToken
        });

    },
    bookingService: async (req, res) => {
        let csrfToken = req.csrfToken();
        return res.render('site/bookings', {
            title: 'تواصل معنا',
            metDescription: 'عنوان دهب دورز',
            ogTitle: 'عنوان دهب دورز',
            csrfToken
        });

    },
    sendMsg: async (req, res) => {
        try {
            const {
                name_contact,
                lastname_contact,
                message_contact,
                phone_contact,
                email_contact,
                captcha
            } = req.body;
            console.log(req.body)
            if (!req.body.captcha) {
                return res.json({
                    errors: true,
                    "success": false,
                    "msg": "Capctha is not checked"
                });

            }
            const secretKey = "6Le8rs8ZAAAAANNqQUUwT0nCWmdEU2iOcWtrZ5rg"
            const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}`;

            request(verifyUrl, (err, response, body) => {
                var valid=true;
                body = JSON.parse(body);

                if (!body.success && body.success === undefined) {
                    valid = false
                    return res.json({
                        "success": false,
                        "msg": "captcha verification failed"
                    });
                } else if (body.score < 0.5) {
                    valid = false
                    return res.json({
                        "success": false,
                        "msg": "you might be a bot, sorry!",
                        "score": body.score, 
                    });
                }
                return res.json({
                    "success": true,
                    "msg": "captcha verification passed",
                    "score": body.score, 
                });
                // return json message or continue with your function. Example: loading new page, ect
                //
                

            });
            if(valid){
                const msg = new MsgSchema({
                    name_contact,
                    lastname_contact,
                    message_contact,
                    contactMobileNo: phone_contact,
                    email_contact,
                })
                await msg.save();
                req.flash('success', "لقد تم إرسال الرسالة بنجاح")
 
            }else{
                req.flash('errors', "من فضلك أعد المحاولة")

            }
            
            


        } catch (err) {
            req.flash('error', "من فضلك أعد المحاولة")
            return res.json({
                "error":true,
                errors: true,
                message: "Error In Getting Message", 
            })
        }


    }

}

module.exports = homePageService