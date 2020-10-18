const ProductSchema = require('../../models/productSchema');
const TypeSchema = require('../../models/typeSchema');


const productService = {
    singleProduct: async (req, res) => {
        const {slug} = req.params
        const product = await ProductSchema.findOne({
            slug:slug
        })
        return res.render('site/singleProduct', {
            title: 'Elsafa Plast | Products ',
            metDescription: 'اسئلة شائعة عن طريقة تأجير الوحدات فى دهب مع دهب دورز',
            ogTitle: 'اسئلة شائعة عن طريقة تأجير الوحدات فى دهب مع دهب دورز',
            dataProvided:product
        });

    },
    prodPage: async (req, res) => {
        const products = await ProductSchema.find().populate('type')
        const types = await TypeSchema.find()
        return res.render('site/products', {
            title: 'الأسئلة الشائعة',
            metDescription: 'اسئلة شائعة عن طريقة تأجير الوحدات فى دهب مع دهب دورز',
            ogTitle: 'اسئلة شائعة عن طريقة تأجير الوحدات فى دهب مع دهب دورز',
            dataProvided:products, 
            types
        });

    },

}

module.exports = productService