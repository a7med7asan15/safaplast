const ProductSchema = require('../models/productSchema');
const TypeSchema = require('../models/typeSchema');



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
        populate: 'type'
      }
      const products = await ProductSchema.paginate({}, options);
      return res.render('screens/productScreens/listAll', {
        thisUser: req.user,
        csrfToken,
        dataProvided: products,
        title: "جميع المنتجات"
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
        types,
        title: "منتج جديد"
      })

    } catch (err) {
      req.flash('error', 'من فضلك أعد المحاولة, please reload')
    }

  },
  create: async (req, res) => {
    const {
      type,
      images,
      code,
      title,
      htmlInfo,
      htmlTable,
    } = req.body;
    const im = images.split(',')
    try {
      const product = new ProductSchema({
        type,
        code,
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


      req.flash('success', 'تم إضافة المنتج بنجاح')
      return res.json({
        err: false,
        message: "Product Added Successfuly"
      });

    } catch (err) {
      console.log(err);
      req.flash('error', 'أعد المحاولة')

    }
  },

  update: async (req, res) => {
    const {
      type,
      images,
      code,
      title,
      htmlInfo,
      htmlTable,
    } = req.body;
    let im = [];
    if (images) {
      im = images.split(',');
    }
    try {
      const updateData = await ProductSchema.findById(req.query.id);
      let imagesLoop = [];
      if (im.length) {
        for (i = 0; i < im.length; i++) {
          imagesLoop.push({
            imageLink: im[i]
          });
        }
      }
      updateData.title = title;
      updateData.type = type;
      updateData.code = code;
      updateData.images = imagesLoop;
      updateData.htmlInfo = htmlInfo;
      updateData.htmlTable = htmlTable;
      await updateData.save();

      req.flash('success', 'تم تعديل المنتج بنجاح')
      return res.json({
        err: false,
        message: "Product Updated Succesfully"
      });


    } catch (err) {
      req.flash('error', 'من فضلك أعد المحاولة')
      return res.json({
        err: true,
        message: "ProductNOT Updated"
      });

    }

  },
  destroy: async (req, res) => {
    const {
      dataId
    } = req.params;
    try {
      const deleteData = await ProductSchema.findByIdAndDelete(dataId);

      req.flash('success', `${deleteData.title} تم حذف المنتج`)
      return res.redirect(`/dashboard/products`)
    } catch (err) {
      req.flash('error', 'من فضلك أعد المحاولة')
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
            title: {
              '$regex': table_search,
              '$options': 'i'
            }
          },
          {
            code: {
              '$regex': table_search,
              '$options': 'i'
            }
          },
          {
            'type.name': {
              '$regex': table_search,
              '$options': 'i'
            }
          },
        ]
      }).populate('type')
      return res.render('screens/productScreens/listAll', {
        thisUser: req.user,
        csrfToken,
        table_search,
        tbSearch
      })

    } catch (err) {
      console.log(err)
      req.flash('error', 'من فضلك أعد المحاولة')
      return res.render('screens/productScreens/listAll', {
        thisUser: req.user,
        table_search: "",
        tbSearch: {},
        csrfToken
      })
    }


  },
  /*preview: async (req, res) => {
    var dataId = req.params.id
    try {
      var product= await ProductSchema.findById(dataId).populate('areaId type rooms amenties brokers');
      return res.render('screens/productScreens/showOneScreen', {
        thisUser: req.user,
        dataProvided: product,
      });
    } catch (err) {
    }

  }, */
  showOne: async (req, res) => {
    const {
      dataId
    } = req.params
    let csrfToken = req.csrfToken();


    try {

      const types = await TypeSchema.find();

      const product = await ProductSchema.findById(dataId).populate('type');
      return res.render('screens/productScreens/edit', {
        thisUser: req.user,
        dataProvided: product,
        csrfToken,
        types,

      })
    } catch (err) {
      req.flash('error', 'من فضلك أعد المحاولة')
      console.log(err);
      return res.render('screens/productScreens/edit', {
        thisUser: req.user,
        dataProvided: {},
        csrfToken
      })
    }

  },
  redirectHome: async (req, res) => {
    return res.redirect(`/dashboard/products`)
  }

}

module.exports = productService