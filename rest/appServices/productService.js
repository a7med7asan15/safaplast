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
const productSchema = require('../models/productSchema');




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
          msg: "Error In Id Product"
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
    const validation = validationFunction(body, schemas.productVarient);

    if (validation.error) {
      console.log(validation.error.details[0].message)
      return res.status(200).json({
        err: true,
        msg: validation.error.details[0].message
      });

    }

    try {

      const product = await ProductSchema.findById(productId);
      if (!product) {

        return res.status(200).json({
          err: true,
          msg: "Error In Id Product"
        });
      }
      product.status = 'pending';

      const varient = product.productColors.id(varientId);
      if (!varient) {

        return res.status(200).json({
          err: true,
          msg: "Error In Id Variant"
        });
      }
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

    // validation   
    const body = req.body;
    const validation = validationFunction(body, schemas.productSizeQuantity);

    if (validation.error) {
      console.log(validation.error.details[0].message)
      return res.status(200).json({
        err: true,
        msg: validation.error.details[0].message
      });

    }

    try {
      const product = await ProductSchema.findById(productId)
      if (!product) {

        return res.status(200).json({
          err: true,
          msg: "Error In Id Product"
        });
      }
      const varient = product.productColors.id(varientId);
      if (!varient) {

        return res.status(200).json({
          err: true,
          msg: "Error In Id Variant"
        });
      }
      const sizeQuantity = varient.colorSizes.id(sizeQuantityId);
      if (!sizeQuantity) {

        return res.status(200).json({
          err: true,
          msg: "Error In Id Size Quantity"
        });
      }

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
    // validation   
    const body = req.body;
    const validation = validationFunction(body, schemas.addQuantity);

    if (validation.error) {
      console.log(validation.error.details[0].message)
      return res.status(200).json({
        err: true,
        msg: validation.error.details[0].message
      });

    }

    try {
      const product = await ProductSchema.findById(productId);
      if (!product) {

        return res.status(200).json({
          err: true,
          msg: "Error In Id Product"
        });
      }
      const varient = product.productColors.id(varientId);
      if (!varient) {

        return res.status(200).json({
          err: true,
          msg: "Error In Variant Id"
        });
      }
      const sizeQuantity = varient.colorSizes.id(sizeQuantityId);
      if (!sizeQuantity) {

        return res.status(200).json({
          err: true,
          msg: "Error In Size Quantity Id"
        });
      }
      const newquantity = parseInt(sizeQuantity.allQuantity) + parseInt(newQuantity);
      sizeQuantity.allQuantity = newquantity;

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
  addToProduct: async (req, res) => {

    const {
      dataTab
    } = req.query;

    switch (dataTab) {
      case 'varient':
        productService.addVarient(req, res);
        break;
      case 'size':
        productService.addSize(req, res);
        break;
      default:
        return res.send('No Data Type');
    }
  },
  addVarient: async (req, res) => {
    const {
      productId
    } = req.query;
    const {
      colorId,
      image,
      filename
    } = req.body;
    const varient = {
      colorId,
      image,
      filename
    }

    // validation   
    const body = req.body;
    const validation = validationFunction(body, schemas.addVariant);

    if (validation.error) {
      console.log(validation.error.details[0].message)
      return res.status(200).json({
        err: true,
        msg: validation.error.details[0].message
      });

    }

    try {
      const product = await ProductSchema.findById(productId);
      if (!product) {

        return res.status(200).json({
          err: true,
          msg: "Error In Product Id"
        });
      }
      product.status = 'pending';
      product.productColors.push(varient);
      await product.save();
      return res.status(200).json({
        err: false,
        msg: "Vaient Color Added  Successfully"
      });

    } catch (err) {
      return res.status(200).json({
        err: true,
        msg: "Error In Adding Varient Color "
      });

    }

  },
  addSize: async (req, res) => {
    const {
      productId
    } = req.query;
    const {
      sizeId,
      allQuantity,
      varientId
    } = req.body;
    const size = {
      sizeId,
      allQuantity,
      quantityNow: allQuantity
    }

    // validation   
    const body = req.body;
    const validation = validationFunction(body, schemas.addSize);

    if (validation.error) {
      console.log(validation.error.details[0].message)
      return res.status(200).json({
        err: true,
        msg: validation.error.details[0].message
      });

    }

    try {
      const product = await ProductSchema.findById(productId);
      if (!product) {

        return res.status(200).json({
          err: true,
          msg: "Error In Product Id"
        });
      }
      const varient = product.productColors.id(varientId);
      if (!varient) {

        return res.status(200).json({
          err: true,
          msg: "Error In Variant Id"
        });
      }
      varient.colorSizes.push(size)
      await product.save();
      return res.status(200).json({
        err: false,
        msg: "Size and quantity  Added  Successfully"
      });

    } catch (err) {
      return res.status(200).json({
        err: true,
        msg: "Error In Adding Size And Quantity "
      });

    }
  },
  deleteProduct: async (req, res) => {
    const {
      dataTab
    } = req.query;
    switch (dataTab) {
      case 'regular':
        productService.deleteRegular(req, res);
        break;
      case 'varient':
        productService.deleteVarient(req, res);
        break;
      case 'size':
        productService.deleteSize(req, res);
        break;
      default:
        return res.send('No Data Type');
    }
  },
  deleteRegular: async (req, res) => {
    const {
      productId
    } = req.query;
    
    try {
      const product = await ProductSchema.findById(productId);
      if (!product) {

        return res.status(200).json({
          err: true,
          msg: "Error In Product Id"
        });
      }
      product.status = 'deleted';
      product.productColors.forEach((varient) => {
        varient.status = 'deleted';
      })
      await product.save();
      return res.status(200).json({
        err: false,
        msg: "Product Deleted Successfully"
      });

    } catch (err) {
      return res.status(200).json({
        err: false,
        msg: "Error In Deleting Product"
      });

    }
  },
  deleteVarient: async (req, res) => {
    const {
      productId
    } = req.query;
    const {
      varientId
    } = req.body;
    try {
      const product = await ProductSchema.findById(productId);
      if (!product) {

        return res.status(200).json({
          err: true,
          msg: "Error In Product Id"
        });
      }
      const varient = product.productColors.id(varientId);
      if (!varient) {

        return res.status(200).json({
          err: true,
          msg: "Error In Variant Id"
        });
      }
      varient.status = 'deleted';
      product.save();
      return res.status(200).json({
        err: false,
        msg: "varient Deleted Successfully"
      });

    } catch (err) {
      return res.status(200).json({
        err: false,
        msg: "Error In Deleting varient"
      });

    }
  },
  deleteSize: async (req, res) => {
    const {
      productId
    } = req.query;
    const {
      varientId,
      sizeId
    } = req.body;
    try {
      const product = await ProductSchema.findById(productId);
      if (!product) {

        return res.status(200).json({
          err: true,
          msg: "Error In Product Id"
        });
      }
      const varient = product.productColors.id(varientId);
      if (!varient) {

        return res.status(200).json({
          err: true,
          msg: "Error In Variant Id"
        });
      }
      const size = varient.colorSizes.id(sizeId);
      if (!size) {

        return res.status(200).json({
          err: true,
          msg: "Error In Size Id"
        });
      }
      size.status = 'deleted';
      await product.save();
      return res.status(200).json({
        err: false,
        msg: "Size Deleted Successfully"
      });

    } catch (err) {
      return res.status(200).json({
        err: false,
        msg: "Error In Deleting Size"
      });

    }
  }


}

module.exports = productService