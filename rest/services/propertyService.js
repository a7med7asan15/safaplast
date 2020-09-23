const {
  AreaSchema
} = require('../models/citySchema');
const {
  TypesSchema,
  RoomsSchema
} = require('../models/categorySchema');
const PropertySchema = require('../models/propertySchema');
const {
  AmentiesSchema
} = require('../models/amentiesSchema');
const BrokerSchema = require('../models/brokerSchema');


const propertyService = {
  listAllProps: async (req, res) => {
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
      const propertys = await PropertySchema.paginate({}, options);
      return res.render('screens/propScreens/listAllProps', {
        thisUser: req.user,
        csrfToken,
        propertys
      })

    } catch (err) {
      res.send('error')
    }

  },
  addPropPage: async (req, res) => {
    let csrfToken = req.csrfToken();
    try {
      const areas = await AreaSchema.find();
      const type = await TypesSchema.find();
      const rooms = await RoomsSchema.find();
      const amen = await AmentiesSchema.find();
      const brok = await BrokerSchema.find();
      return res.render('screens/propScreens/addPropScreen', {
        thisUser: req.user,
        csrfToken,
        areas,
        type,
        rooms,
        brok,
        amen
      })

    } catch (err) {
      req.flash('error', 'Something went wrong, please reload')
    }

  },
  createProp: async (req, res) => {
    const {
      nameEnglish,
      nameArabic,
      mobileNumber,
      nameArea,
      type,
      rooms,
      sku,
      price,
      desArabic,
      desEnglish,
      images,
      amenties,
      brokers
    } = req.body;
    const im = images.split(',')
    try {
      const areaObj = await AreaSchema.findById(nameArea);
      const prop = new PropertySchema({
        createdby: req.user.id,
        nameEnglish,
        nameArabic,
        type,
        price,
        rooms,
        sku,
        mobileNumber,
        amenties,
        brokers,
        cityId: areaObj.parent,
        areaId: areaObj.id,
        Address: {
          desriptionArabic: desArabic,
          descriptionEnglish: desEnglish,
        },

      });
      for (i = 0; i < im.length; i++) {
        prop.images.push({
          imageLink: im[i]
        });
      }
      await prop.save();


      req.flash('success', 'Property Added Succesfully')
      return res.json({
        err: false,
        message: "Property Added Successfuly"
      });

    } catch (err) {
      req.flash('success', 'Property Not Added ')
      return res.json({
        err: true,
        message: "Property Not Added "
      });

    }
  },
  
  update: async (req, res) => {
    const {
      nameEnglish,
      nameArabic,
      mobileNumber,
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
      const updateProp = await PropertySchema.findById(req.query.id);
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
      updateProp.mobileNumber = mobileNumber;
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

      req.flash('success', 'Property Updated Succesfully')
      return res.json({
        err: false,
        message: "Property Updated Succesfully"
      });


    } catch (err) {
      req.flash('error', {
        message: 'Property Not Updated'
      })
      return res.json({
        err: true,
        message: "Property NOT Updated"
      });

    }

  },
  destroy: async (req, res) => {
    const {
      propId
    } = req.params;
    try {
      const deleteProp = await PropertySchema.findByIdAndDelete(propId);

      req.flash('success', `${deleteProp.nameEnglish} Deleted Successfully`)
      return res.redirect(`/dashboard/propertys`)
    } catch (err) {
      req.flash('error', {
        message: 'Something Went wrong'
      })
      return res.redirect(`/dashboard/propertys`)

    }
  },
  searchShowProp: async (req, res) => {
    try {
      let csrfToken = req.csrfToken();
      const {
        table_search,
      } = req.body;
      const tbSearch = await PropertySchema.find({
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
          {
            mobileNumber: {
              '$regex': table_search,
              '$options': 'i'
            }
          }
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
  propertyPage: async (req, res) => {
    var propertyId = req.params.id
    try {
      var property = await PropertySchema.findById(propertyId).populate('areaId type rooms amenties brokers');
      return res.render('screens/propScreens/showOneScreen', {
        thisUser: req.user,
        property: property,
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

      const property = await PropertySchema.findById(propId);
      return res.render('screens/propScreens/editPropScreen', {
        thisUser: req.user,
        property,
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
        property: {},
        csrfToken
      })
    }

  },
}

module.exports = propertyService