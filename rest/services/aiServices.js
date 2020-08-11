const {
    location,
    projectId,
    aiHelpers,
    clientProd,
    locationPath
} = require('../helpers/aiHelpers');

const aiServices = {


    // Show Service 

    showProductSets: async (req, res) => {
        try {

            let csrfToken = req.csrfToken();
            const [productSets] = await clientProd.listProductSets({
                parent: locationPath
            });
            return res.render('screens/aiScreens/listAllProductSets', {
                thisUser: req.user,
                csrfToken,
                dataProvided: productSets
            })
        } catch (err) {

            return res.render('screens/categoryScreens/typesScreen', {
                thisUser: req.user,
                csrfToken,
                dataProvided: {}
            })
        }

    },
    getAllProducts: async (req, res) => {
        let csrfToken = req.csrfToken();
        try {

            const [products] = await clientProd.listProducts({
                parent: locationPath
            });
            return res.render('screens/aiScreens/listAllProducts', {
                thisUser: req.user,
                csrfToken,
                dataProvided: products
            })
        } catch (err) {
            res.send(err)
            // return res.render('screens/aiScreens/listAllProducts', {
            //     thisUser: req.user,
            //     csrfToken,
            //     dataProvided:{}
            // })
        }
    },
    geProducts: async (req, res) => {
        const {
            productID
        } = req.query;

    },
    addProductSet: async (req, res) => {
        try {
            const {
                listName,
                listId
            } = req.body;

            const productSet = {
                displayName: listName,
            };

            const request = {
                parent: locationPath,
                productSet: productSet,
                productSetId: listId,
            };
            const [createdProductSet] = await clientProd.createProductSet(request);

            req.flash('success', 'Product Added succefully ')
            return res.redirect('/dashboard/ai/productlists');

        } catch (err) {



            req.flash('error', 'Product Added Error ')
            return res.redirect('/dashboard/ai/productlists');
        }

    },
    deleteProductSet: async (req, res) => {
        const {
            productListId
        } = req.query;

        try {
            const productSetPath = clientProd.productSetPath(
                projectId,
                location,
                productListId
            );
            await clientProd.deleteProductSet({
                name: productSetPath
            });

            req.flash('success', 'Product Deleted succefully ')
            return res.redirect('/dashboard/ai/productlists');


        } catch (err) {
            console.log(err);
            req.flash('error', 'Product Delete Error ')
            return res.redirect('/dashboard/ai/productlists');


        }

    },
    getProductSetProducts: async (req, res) => {
        try {
            const {
                id
            } = req.params;
            const csrfToken = req.csrfToken()
            const productSetPath = clientProd.productSetPath(
                projectId,
                location,
                id
            );

            const request = {
                name: productSetPath,
            };

            const [products] = await clientProd.listProductsInProductSet(request);
            return res.render('screens/aiScreens/listAllProducts', {
                thisUser: req.user,
                csrfToken,
                dataProvided: products,
                productSetId: id
            })

        } catch (err) {

            res.send(err)
        }
    },
    deleteProductInProductSet: async (req, res) => {
        try {
            const {
                productSetId
            } = req.params
            const purgeConfig = {
                productSetId: productSetId
            };
            const force = true;
            const [operation] = await clientProd.purgeProducts({
                parent: locationPath,
                productSetPurgeConfig: purgeConfig,
                force: force,
            });
            await operation.promise();

            req.flash('success', 'Product Deleted succefully ')
            return res.redirect(`/dashboard/ai/products/${productSetId}`);


        } catch (err) {
            req.flash('error', 'Product Deleted Error ')
            return res.redirect('/dashboard/ai/products');


        }


    },
    deleteProduct: async (req, res) => {
        try {
            const {
                id
            } = req.query;
            const productPath = clientProd.productPath(projectId, location, id);
            const deleteProduct = await clientProd.deleteProduct({
                name: productPath
            });
            res.redirect('/dashboard/ai/products');
        } catch (err) {


        }


    }
}

module.exports = aiServices