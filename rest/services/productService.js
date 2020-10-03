
const ProductSchema = require('../models/productSchema');
const TypeSchema = require('../models/productSchema');



const productService = {
  list: async (req, res) => {
    let page = 1;
    let limit = 1;

    if (req.query.p) {
      page = parseInt(req.query.p, 10)
    }

    let csrfToken = req.csrfToken();
    try {
      const options = {
        page,
        limit: 10,
      }
      const products = await ProductSchema.paginate({}, options);
      return res.render('screens/productScreens/listAll', {
        thisUser: req.user,
        csrfToken,
        dataProvided: products
      })

    } catch (err) {
      res.send('error')
    }

  },
  addPage: async (req, res) => {
    let csrfToken = req.csrfToken();
    try {
      const types = await TypeSchema.find();
      return res.render('screens/productScreens/add', {
        thisUser: req.user,
        csrfToken,
        types
      })

    } catch (err) {
      req.flash('error', 'Something went wrong, please reload')
    }

  },
  create: async (req, res) => {
    const {
      type, 
      images, 
      title, 
      htmlInfo, 
      htmlTable, 
    } = req.body;
    const im = images.split(',')
    try {

      const product = new ProductSchema({
        type, 
        title, 
        htmlInfo, 
        htmlTable
      });
      for (i = 0; i < im.length; i++) {
        product.images.push({
          imageLink: im[i]
        });
      }
      await product.save();


      req.flash('success', 'Product Added Succesfully')
      return res.json({
        err: false,
        message: "Product Added Successfuly"
      });

    } catch (err) {
      req.flash('success', 'Product Not Added ')
      return res.json({
        err: true,
        message: "Product Not Added "
      });

    }
  },
  
  update: async (req, res) => {
    const {
      nameEnglish,
      nameArabic,
      nameArea,
      sku,
      type,
      rooms,
      price,
      desArabic,
      desEnglish,
      images,
      amenties,
      brokers
    } = req.body;
    let im = [];
    if (images) {
      im = images.split(',');
    }
    try {
      const updateProp = await ProductSchema.findById(req.query.id);
      let imagesLoop = [];
      if (im.length) {
        for (i = 0; i < im.length; i++) {
          imagesLoop.push({
            imageLink: im[i]
          });
        }
      }
      updateProp.nameEnglish = nameEnglish;
      updateProp.nameArabic = nameArabic;
      updateProp.type = type;
      updateProp.price = price;
      updateProp.rooms = rooms;
      updateProp.areaId = nameArea;
      updateProp.Address.desriptionArabic = desArabic;
      updateProp.Address.descriptionEnglish = desEnglish;
      updateProp.images = imagesLoop;
      updateProp.amenties = amenties;
      updateProp.brokers = brokers;
      updateProp.sku = sku;
      await updateProp.save();

      req.flash('success', 'ProductUpdated Succesfully')
      return res.json({
        err: false,
        message: "ProductUpdated Succesfully"
      });


    } catch (err) {
      req.flash('error', {
        message: 'ProductNot Updated'
      })
      return res.json({
        err: true,
        message: "ProductNOT Updated"
      });

    }

  },
  destroy: async (req, res) => {
    const {
      propId
    } = req.params;
    try {
      const deleteProp = await ProductSchema.findByIdAndDelete(propId);

      req.flash('success', `${deleteProp.nameEnglish} Deleted Successfully`)
      return res.redirect(`/dashboard/products`)
    } catch (err) {
      req.flash('error', {
        message: 'Something Went wrong'
      })
      return res.redirect(`/dashboard/products`)

    }
  },
  searchShow: async (req, res) => {
    try {
      let csrfToken = req.csrfToken();
      const {
        table_search,
      } = req.body;
      const tbSearch = await ProductSchema.find({
        "$or": [{
            nameArabic: {
              '$regex': table_search,
              '$options': 'i'
            }
          },
          {
            nameEnglish: {
              '$regex': table_search,
              '$options': 'i'
            }
          },
        ]
      });
      return res.render('screens/propScreens/listAllProps', {
        thisUser: req.user,
        csrfToken,
        table_search,
        tbSearch
      })

    } catch (err) {

      req.flash('error', 'Something Went wrong')
      return res.render('screens/propScreens/listAllProps', {
        thisUser: req.user,
        table_search,
        tbSearch: {},
        csrfToken
      })
    }


  },
  preview: async (req, res) => {
    var dataId = req.params.id
    try {
      var product= await ProductSchema.findById(dataId).populate('areaId type rooms amenties brokers');
      return res.render('screens/propScreens/showOneScreen', {
        thisUser: req.user,
        dataProvided: product,
      });
    } catch (err) {
    }

  }, 
  showOne: async (req, res) => {
    const {
      propId
    } = req.params
    let csrfToken = req.csrfToken();


    try {

      const areas = await AreaSchema.find();
      const type = await TypesSchema.find();
      const rooms = await RoomsSchema.find();
      const amen = await AmentiesSchema.find();
      const brok = await BrokerSchema.find();

      const product= await ProductSchema.findById(propId);
      return res.render('screens/propScreens/editPropScreen', {
        thisUser: req.user,
        dataProvided,
        csrfToken,
        areas,
        type,
        rooms,
        amen,
        brok

      })
    } catch (err) {
      req.flash('error', 'Something Went wrong')
      console.log(err);
      return res.render('screens/propScreens/editPropScreen', {
        thisUser: req.user,
        dataProvided: {},
        csrfToken
      })
    }

  },
}

module.exports = productService