const User = require('../models/Users');
const {
  AreaSchema
} = require('../models/citySchema');
const {
  TypesSchema,
  RoomsSchema
} = require('../models/categorySchema');
const PropertySchema = require('../models/propertySchema');
const AmentiesSchema = require('../models/amentiesSchema');

const propertyService = {
  listAllStores: async (req, res) => {
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
        populate: 'storeOwner'

      }
      const propertys = await PropertySchema.paginate({}, options);
      return res.render('screens/storeScreens/listAllStores', {
        thisUser: req.user,
        csrfToken,
        propertys
      })

    } catch (err) {
      res.send('error')
    }

  },
  addStorePage: async (req, res) => {
    let csrfToken = req.csrfToken();
    const areas = await AreaSchema.find();
    const type = await TypesSchema.find();
    const rooms = await RoomsSchema.find();
    const amen = await AmentiesSchema.find();

    return res.render('screens/storeScreens/addStoreScreen', {
      thisUser: req.user,
      csrfToken,
      areas,
      type,
      rooms,
      amen
    })

  },
  createStore: async (req, res) => {
    const {
      storeEnglish,
      storeArabic,
      mobileNumber,
      area,
      type,
      rooms,
      price,
      addressArabic,
      addressEnglish,
      images,
      amenties
    } = req.body;
    const im = images.split(',')
    try {
      const areaObj = await AreaSchema.findById(area);
      const store = new PropertySchema({
        createdby : req.user.id,
        nameEnglish: storeEnglish,
        nameArabic:storeArabic,
        type,
        price,
        rooms,
        mobileNumber,
        amenties,
        cityId: areaObj.parent,
        areaId: areaObj.id,
        Address: {
          desriptionArabic:addressArabic,
          descriptionEnglish:addressEnglish,
        },
        
      });
      for(i=0 ; i<im.length ; i++){
        store.images.push({imageLink : im[i]});
      }
      await store.save();
      

      req.flash('success', 'Property Added Succesfully')
      return res.json({err:false,message:"Property Added Successfuly"});

    } catch (err) {
      return res.json({err:true,message:"Property Not Added Successfuly"});

    }
  },

  showOne: async (req, res) => {
    req.session.lastlink = req.url
    let csrfToken = req.csrfToken();
    try {
      var {
        id
      } = req.query
      const areas = await AreaSchema.find();
      const type = await TypesSchema.find();
      const rooms = await RoomsSchema.find();
      const amen = await AmentiesSchema.find();

      const property = await PropertySchema.findById(id);
      return res.render('screens/storeScreens/editStoreScreen', {
        thisUser: req.user,
        property,
        csrfToken,
        areas,
        type,
        rooms,
        amen

      })
    } catch (err) {
      req.flash('error', 'Something Went wrong')
      
      return res.render('screens/storeScreens/editStoreScreen', {
        thisUser: req.user,
        storeToEdit: {},
        csrfToken
      })
    }

  },

  update: async (req, res) => {
    const {id}= req.query;
    const {
      storeEnglish,
      storeArabic,
      mobileNumber,
      area,
      type,
      rooms,
      price,
      addressArabic,
      addressEnglish,
      images,
      amenties
    } = req.body;
      let im = images.split(',');
    try {
      const updateStore = await PropertySchema.findById(id);
      let images = [] ;
      for(i=0 ; i<im.length ; i++){
        images.push({imageLink : im[i]});
      }
      updateStore.nameEnglish = storeEnglish;
      updateStore.nameArabic = storeArabic;
      updateStore.mobileNumber = mobileNumber;
      updateStore.type = type;
      updateStore.price = price;
      updateStore.rooms = rooms;
      updateStore.areaId = area;
      updateStore.Address.desriptionArabic = addressArabic;
      updateStore.Address.descriptionEnglish = addressEnglish;
      updateStore.images = images;
      updateStore.amenties = amenties;
       await updateStore.save();

  
      req.flash('success', 'Property Updated Succesfully')
      return res.json({err:false,message:"Property Updated Successfuly"});

    } catch (err) {
      console.log(err);
      req.flash('error', {
        message: 'Something Went wrong'
      })
      return  res.json({err:true,message:"Property NOT Updated Successfuly"});
    }

  },

  destroy: async (req, res) => {
    const {
      storeId
    } = req.params;
    try {
      const deleteStore = await PropertySchema.findByIdAndDelete(storeId);

      req.flash('success', `${deleteStore.storeEnglish} Deleted Successfully`)
      return res.redirect(`/dashboard/propertys`)
    } catch (err) {
      req.flash('error', {
        message: 'Something Went wrong'
      })
      return res.redirect(`/dashboard/propertys`)

    }
  },

  searchShowStore: async (req, res) => {
    try {
      let csrfToken = req.csrfToken();
      const {
        table_search,
      } = req.body;
      const tbSearch = await StoreSchema.find({
        "$or": [
          {
            storeArabic: {
              '$regex': table_search,
              '$options': 'i'
            }
          },
          {
            storeEnglish: {
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
      return res.render('screens/storeScreens/listAllStores', {
        thisUser: req.user,
        csrfToken,
        table_search,
        tbSearch
      })

    } catch (err) {

      req.flash('error', 'Something Went wrong')
      return res.render('screens/storeScreens/listAllStores', {
        thisUser: req.user,
        table_search,
        tbSearch: {},
        csrfToken
      })
    }


  }

}

module.exports = propertyService