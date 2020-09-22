const {
    location,
    projectId,
    aiHelpers,
    clientProd,
    locationPath,
    productSetPath,
    defaultProductCategory,
    imageLink
} = require('../helpers/aiHelpers');
const {
    ProductSchema
} = require('../models/productSchema');
const {OrdersSchema, TotalOrderSchema} = require('../models/ordersSchema');
const reviewService = {


    // Show All Reviews 

    showAllReviews: async (req, res) => {
        try {
            let page = 1;
            let limit = 1;

            if (req.query.p) {
                page = parseInt(req.query.p, 10)
            }
            const options = {
                page,
                limit: 20,
                populate: 'propertyId'
            }

            let csrfToken = req.csrfToken();

            const bookings = await TotalOrderSchema.paginate({
                review: "pending",
                status: "active"
            }, options)
          
            return res.render('screens/reviewScreens/listReviews', {
                thisUser: req.user,
                csrfToken,
                dataProvided: bookings, 
                dateNow: Date.now(),
            })

        } catch (err) {
            res.send(err)
            console.log(err);


        }


    },
    checkpoint: async (req, res) => {
        const {
            id,
            request
        } = req.query;

        try {
            const order = await OrdersSchema.findById(id);
            if (order.review === "pending") {

                order.review = request;
            }
            order.save();
    
            req.flash('success', `Succefully ${request}ed order`);
            res.redirect('/dashboard/booking')
        } catch (err) {
            req.flash('error', 'fucked Up');
            res.redirect('/dashboard/booking')

        }
    },
    showActualBookings: async (req, res) => {
        try {

            let page = 1;
            let limit = 1;

            if (req.query.p) {
                page = parseInt(req.query.p, 10)
            }
            const options = {
                page,
                limit: 20,
                populate: 'propertyId'
            }

            let csrfToken = req.csrfToken();

            const bookings = await OrdersSchema.paginate({
                review: "accept",
                status: "active"
            }, options)

            return res.render('screens/reviewScreens/listAccepted', {
                thisUser: req.user,
                csrfToken,
                dataProvided: bookings
            })

        } catch (err) {
            res.send(err)


        }
    },
    reviewOneProduct: async (req, res) => {
        const {
            id
        } = req.query

        try {
            const csrfToken = req.csrfToken();
            const product = await ProductSchema.findById(id)
                .populate(['classId ', 'varId', 'typeId', 'storeId', 'productColors.colorId', 'productColors.colorSizes.sizeId']);

            return res.render('screens/reviewScreens/revProductScreen', {
                thisUser: req.user,
                csrfToken,
                dataProvided: product
            })
        } catch (err) {

            res.send(err);

        }


    },
    acceptProduct: async (req, res) => {

        const {
            id
        } = req.query
        try {

            const product = await ProductSchema.findById(id)
                .populate(['classId ', 'varId', 'typeId', 'storeId', 'productColors.colorId', 'productColors.colorSizes.sizeId']);
            const productData = {
                displayName: product.name,
                productCategory: defaultProductCategory,
                productLabels: []
            }
            const request = {
                parent: locationPath,
                product: productData,
                productId: ''
            }

            for (i = 0; i < product.productColors.length; i++) {
                if (product.productColors[i].aiProductStatus === 'active') {
                    const productPath = clientProd.productPath(projectId, location, product.productColors[i].aiProductId);
                    const deleteProduct = await clientProd.deleteProduct({
                        name: productPath
                    });

                }
                if (product.productColors[i].status === 'active') {
                    let colorId = product.productColors[i].id;

                    request.product.productLabels = [{
                            key: "parent",
                            value: product.id
                        },
                        {
                            key: "status",
                            value: 'active'
                        },
                    ]

                    request.productId = colorId;


                    var imageBucketLink = await imageLink(product.productColors[i].filename);
                    var [createProduct] = await clientProd.createProduct(request);
                    var productPath = await clientProd.productPath(projectId, location, colorId);

                    var addProductToSet = await clientProd.addProductToProductSet({
                        name: productSetPath,
                        product: productPath,
                    })

                    var linkRef = await clientProd.createReferenceImage({
                        parent: productPath,
                        referenceImage: {
                            uri: imageBucketLink
                        }
                    })
                    const varient = product.productColors.id(colorId);
                    varient.aiProductId = colorId
                    varient.aiProductStatus = 'active';
                    await varient.save()
               
                }
            }
            product.review = 'active';
            product.aiStatus = 'linked';
            await product.save();
            req.flash('success', 'Product Succefully Activated ')
            return res.redirect('/dashboard/review')
        } catch (err) {
            req.flash('error ', 'Error In Activating Product')
            return res.redirect('/dashboard/review')

        }
    },
    showDeletedProducts: async (req, res) => {
        try {

            let page = 1;
            let limit = 1;

            if (req.query.p) {
                page = parseInt(req.query.p, 10)
            }
            const options = {
                page,
                limit: 10,
                populate: 'classId varId typeId'
            }

            let csrfToken = req.csrfToken();

            const products = await ProductSchema.paginate({
                aiStatus: "linked",
                "productColors.status": "deleted"
            }, options)


            return res.render('screens/reviewScreens/listDeleted', {
                thisUser: req.user,
                csrfToken,
                dataProvided: products
            })

        } catch (err) {
            res.send(err)


        }
    },
    deleteProduct: async (req, res) => {
        const {
            id
        } = req.query
        try {
            const product = await ProductSchema.findById(id);
            const aiProduct = {
                name: '',
                productLabels: [{
                        key: "parent",
                        value: product.id
                    },
                    {
                        key: "status",
                        value: 'deleted'
                    },
                ],
            }
            const updateMask = {
                paths: ['product_labels'],
            };
            for (const varient of product.productColors) {
                if (varient.status === 'deleted') {
                    if (varient.aiProductStatus === 'active') {
                        const productPath = clientProd.productPath(projectId, location, varient.aiProductId);
                        aiProduct.name = productPath;
                        const request = {
                            product: aiProduct,
                            updateMask: updateMask,
                        };
                        const [updatedProduct] = await clientProd.updateProduct(request);
                        varient.aiProductStatus = 'deleted';

                    }

                }
            }
            product.aiStatus = 'unlinked';
            product.save();
            req.flash('success', 'Product Succefully Activated ')
            return res.redirect('/dashboard/review/deleted')
        } catch (err) {
            req.flash('error ', 'Error In Activating Product')
            return res.redirect('/dashboard/review/deleted')

        }
    },
    reviewOneBooking: async(req,res) =>{
        const {
            id
        } = req.query
        
        try {

            const csrfToken = req.csrfToken();
            const dataProvided = await TotalOrderSchema.findById(id).populate('orders.propertyId');

            return res.render('screens/reviewScreens/revBooking', {
                thisUser: req.user,
                csrfToken,
                dataProvided
            })
        } catch (err) {
            console.log(err)
            res.send(err);

        }

    }, 
    searchShow: async (req, res) => {
        try {
            let csrfToken = req.csrfToken();
            const {
                table_search,
            } = req.body;
            const tbSearch = await TotalOrderSchema.find({
                "$or": [
                    { nameCustomer: { '$regex': table_search, '$options': 'i' } },
                    { customerMobileNo: { '$regex': table_search, '$options': 'i' } },
                ]
            });
            return res.render('screens/reviewScreens/listReviews', {
                thisUser: req.user,
                csrfToken,
                table_search,
                tbSearch
            })

        } catch (err) {

            req.flash('error', 'Something Went wrong')
            return res.render('screens/reviewScreens/listReviews', {
                thisUser: req.user,
                tbSearch: {},
                table_search,
                csrfToken
            })
        }


    },

}

module.exports = reviewService