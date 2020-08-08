const {ProductSchema,ProductColorSchema,QuantitySizeSchema} = require('../models/productSchema');
const {VariantsSchema} = require('../models/categorySchema')



const {aiHelpers,clientProd,locationPath,productSetPath} = require('../helpers/aiHelpers');




const productService = {
        addProduct: async (req,res)=>{
        const  {
            name,
            sku,
            classId,
            varId,
            storeId,
            buyPrice,
            sellPrice,
            productColors
          } = req.body;
            
            try{

              const variant = await VariantsSchema.findById(varId);
              const product = new ProductSchema ({
                name,
                sku,
                classId,
                varId,
                typeId:variant.parentType,
                storeId,
                buyPrice,
                sellPrice,
                status:'pending',
                productColors
              })

                await product.save();
                console.log(product)
                res.send('hello');

            }catch(err){

              res.send(err);
            }
        }
}

module.exports = productService