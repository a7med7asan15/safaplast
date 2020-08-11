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
                limit: 10,
                populate: 'classId varId typeId'
            }

            let csrfToken = req.csrfToken();

            const products = await ProductSchema.paginate({
                status: "pending"
            }, options)


            return res.render('screens/reviewScreens/listReviews', {
                thisUser: req.user,
                csrfToken,
                dataProvided: products
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

            if (!product) {
                req.flash('error', {
                    message: 'Something Went wrong. Please Try again'
                })
                return res.redirect('/dashboard/review');
            }

            return res.render('screens/reviewScreens/revProductScreen', {
                thisUser: req.user,
                csrfToken,
                dataProvided: product
            })
        } catch (err) {
            res.send(err);
            req.flash('error', 'Error In Retrieving Product');
            return res.redirect('/dashboard/review')
        }


    },
    acceptProduct: async (req, res) => {

        const {
            id
        } = req.query
        try {

            const product = await ProductSchema.findById(id)
                .populate(['classId ', 'varId', 'typeId', 'storeId', 'productColors.colorId', 'productColors.colorSizes.sizeId']);
            if (!product) {
                req.flash('error', {
                    message: 'Something Went wrong. Please Try again'
                })
                return res.redirect('/dashboard/review');
            }
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
                    console.log(deleteProduct);
                }
                let colorId = product.productColors[i].id;

                request.product.productLabels = [{
                    key: "parent",
                    value: product.id
                }, ]

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
                console.log(varient);
            }
            product.status = 'active';
            await product.save();
            req.flash('success', 'Product Succefully Activated ')
            return res.redirect('/dashboard/review')
        } catch (err) {
            req.flash('error', {
                message: 'Something Went wrong. Please Try again'
            })
            return res.redirect('/dashboard/review')

        }
    }

}

module.exports = reviewService