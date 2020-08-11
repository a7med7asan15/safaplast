const {
  ProductSchema,
  ProductColorSchema,
  QuantitySizeSchema
} = require('../models/productSchema');
const {
  VariantsSchema
} = require('../models/categorySchema')
const {

  validationFunction,

  schemas
} = require('../helpers/apiValidator');


const {
  aiHelpers,
  clientProd,
  locationPath,
  productSetPath
} = require('../helpers/aiHelpers');




const productService = {
  addProduct: async (req, res) => {
    const {
      name,
      sku,
      classId,
      varId,
      storeId,
      buyPrice,
      sellPrice,
      productColors
    } = req.body;

    try {

      const variant = await VariantsSchema.findById(varId);
      const product = new ProductSchema({
        name,
        sku,
        classId,
        varId,
        typeId: variant.parentType,
        storeId,
        buyPrice,
        sellPrice,
        status: 'pending',
        productColors
      })

      await product.save();
      res.status(200).json({
        err: false,
        msg: "Product Added Succefully"
      });

    } catch (err) {

      res.status(200).json({
        err: true,
        msg: "Error in Adding The Product"
      });
    }
  },
  updateProduct: async (req, res) => {
    const {
      dataTab
    } = req.query;

    switch (dataTab) {
      case 'regular':
        productService.updateRegularData(req, res);
        break;
      case 'varient':
        productService.updateVarientData(req, res);
        break;
      case 'quantity':
        productService.updateSizeQuantity(req, res);
        break;
      case 'new-quantity':
        productService.addQuantity(req, res);
        break;
      default:
        return res.send('No Data Type');
    }


  },
  updateRegularData: async (req, res) => {

    const {
      productId
    } = req.query;

    // validation   
    const body = req.body;
    const validation = validationFunction(body, schemas.productRegular);

    if (validation.error) {
      console.log(validation.error.details[0].message)
      return res.status(200).json({
        err: true,
        msg: validation.error.details[0].message
      });

    }


    try {
      const {
        name,
        sku,
        buyPrice,
        sellPrice,
        classId,
        varId
      } = req.body;

      const product = await ProductSchema.findById(productId);
      if (!product) {

        return res.status(200).json({
          err: true,
          msg: "Error In Updatin Product"
        });
      }
      product.name = name;
      product.sku = sku;
      product.name = name;
      product.buyPrice = buyPrice;
      product.sellPrice = sellPrice;
      product.classId = classId;
      product.varId = varId;

      await product.save();

      return res.status(200).json({
        err: false,
        msg: "Product Updated Successfully"
      });

    } catch (err) {

      return res.status(200).json({
        err: true,
        msg: "Error In Updatin Product"
      });

    }
  },
  updateVarientData: async (req, res) => {

    const {
      productId
    } = req.query;
    const varientId = req.body.varientId;

    const {
      colorId,
      image,
      filename
    } = req.body;


    // validation   
    const body = req.body;
    const validation = validationFunction(body, schemas.productRegular);

    if (validation.error) {
      return res.status(200).json({
        err: true,
        msg: validation.error.details[0].message
      });

    }


    try {

      const product = await ProductSchema.findById(productId);

      product.status = 'pending';

      const varient = product.productColors.id(varientId);
      varient.colorId = colorId;
      varient.image = image;
      varient.filename = filename;
      product.save();
      return res.status(200).json({
        err: false,
        msg: "Product Varient Updated Successfully"
      });


    } catch (err) {
      return res.status(200).json({
        err: false,
        msg: "Error Updating Product Varient"
      });
    }

  },
  updateSizeQuantity: async (req, res) => {
    const {
      productId
    } = req.query;
    const varientId = req.body.varientId;
    const sizeQuantityId = req.body.sizeQuantityId
    const {
      sizeId,
      allQuantity

    } = req.body;
    try {
      const product = await ProductSchema.findById(productId)

      const varient = product.productColors.id(varientId);

      const sizeQuantity = varient.colorSizes.id(sizeQuantityId);

      sizeQuantity.sizeId = sizeId;
      sizeQuantity.allQuantity = allQuantity;
      sizeQuantity.quantityNow = allQuantity;

      await product.save();
      return res.status(200).json({
        err: false,
        msg: "Product Size Updated Successfully"
      });

    } catch (err) {
      return res.status(200).json({
        err: true,
        msg: "Error in updating Product Size"
      });

    }

  },
  addQuantity: async (req, res) => {
    const {
      productId
    } = req.query;
    const varientId = req.body.varientId;
    const sizeQuantityId = req.body.sizeQuantityId
    const {
      newQuantity
    } = req.body;
    try {
      const product = await ProductSchema.findById(productId);

      const varient = product.productColors.id(varientId);
      const sizeQuantity = varient.colorSizes.id(sizeQuantityId);
      const newquantity = parseInt(sizeQuantity.allQuantity) + parseInt(newQuantity);
      const newQuantityNow = parseInt(sizeQuantity.quantityNow) + parseInt(newQuantity);
      sizeQuantity.allQuantity = newquantity;
      sizeQuantity.quantityNow = newQuantityNow;

      await product.save();
      return res.status(200).json({
        err: false,
        msg: "Product Size Updated Successfully"
      });

    } catch (err) {
      return res.status(200).json({
        err: true,
        msg: "Error in updating Product Size"
      });

    }



  }

}

module.exports = productService