const ProductSchema = require('../../models/productSchema');
const TypeSchema = require('../../models/typeSchema');
const SettingSchema = require('../../models/settingSchema');



const productService = {
    singleProduct: async (req, res) => {
        const setting = (await SettingSchema.find().limit(1))[0]
        const {slug} = req.params
        const product = await ProductSchema.findOne({
            slug:slug
        })
        
        return res.render('site/singleProduct', {
            title: `${product.title} - Elsafa Plast`,
            metDescription: product.title,
            ogTitle: 'Elsafa Plast for electric Industries',
            dataProvided:product, 
            setting:setting
        });

    },
    prodPage: async (req, res) => {
        const setting = (await SettingSchema.find().limit(1))[0]
        const products = await ProductSchema.find().populate('type')
        const types = await TypeSchema.find()
        return res.render('site/products', {
            title: 'Products - Elsafa Plast',
            metDescription: 'Elsafa Plast for electric Industries',
            ogTitle: 'Elsafa Plast for electric Industries',
            dataProvided:products, 
            types, 
            setting
        });

    },

}

module.exports = productService