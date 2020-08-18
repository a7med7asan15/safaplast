const User = require('../models/Users');
const {
  AreaSchema
} = require('../models/citySchema');
const {
  TypesSchema,
  RoomsSchema
} = require('../models/categorySchema');
const PropertySchema = require('../models/propertySchema');


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
    return res.render('screens/storeScreens/addStoreScreen', {
      thisUser: req.user,
      csrfToken,
      areas,
      type,
      rooms
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
      images
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
        Address: {
          cityId: areaObj.parent,
          areaId: areaObj.id,
          desriptionArabic:addressArabic,
          descriptionEnglish:addressEnglish,
        },
        
      });
      for(i=0 ; i<im.length ; i++){
        store.images.push({imageLink : im[i]});
      }
      await store.save();
      

      req.flash('success', 'Store Added Succesfully')
      return res.json({err:false,message:"Store Added Successfuly"});

    } catch (err) {
      console.log(err);
      return res.json({err:true,message:err});

    }
  },

  showOne: async (req, res) => {
    req.session.lastlink = req.url
    let csrfToken = req.csrfToken();

    try {
      var {
        storeId
      } = req.params

      // const areas = await AreaSchema.paginate();
      const property = await PropertySchema.findById(storeId)
      const areaSel = await AreaSchema.findById(property.Address.areaId);
      return res.render('screens/storeScreens/editStoreScreen', {
        thisUser: req.user,
        property,
        areaSel,
        csrfToken
      })
    } catch (err) {
      req.flash('error', 'Something Went wrong')
      return res.render('screens/variantScreens/editStoreScreen', {
        thisUser: req.user,
        storeToEdit: {},
        areaSel,
        csrfToken
      })
    }

  },

  update: async (req, res) => {
    const {
      storeEnglish,
      storeArabic,
      mobileNumber,
      storeOwner,
      storeArea,
      addressArabic,
      addressEnglish,
      longtude,
      latitude
    } = req.body;
    
    const {
      storeId
    } = req.params
    try {
      const updateStore = await PropertySchema.findById(storeId);
      const oldUser = await User.findById(updateStore.storeOwner);
      
      if(oldUser.stores.includes(updateStore.id)){
        let index = oldUser.stores.indexOf(updateStore.id)
        oldUser.stores.splice(index, 1);
        await oldUser.save();
      }
      
      updateStore.storeEnglish = storeEnglish,
      updateStore.storeArabic = storeArabic,
      updateStore.mobileNumber = mobileNumber,
      updateStore.storeOwner = storeOwner,
      updateStore.Address.areaId = storeArea,
      updateStore.Address.cityId = AreaSchema.findById(storeArea).parent,
      updateStore.Address.addressArabic = addressArabic,
      updateStore.Address.addressEnglish = addressEnglish,
      updateStore.Address.longtude = longtude,
      updateStore.Address.latitude = latitude,

        await updateStore.save();
        const newUser = await User.findById(storeOwner);
        newUser.stores.push(updateStore.id);
        newUser.save();

      req.session.passedData = false
      req.flash('success', 'Store Updated Succesfully')
      return res.redirect(`/dashboard/stores/edit/${storeId}`)
    } catch (err) {
      req.flash('error', {
        message: 'Something Went wrong'
      })
      return res.redirect(`/dashboard/stores/edit/${storeId}`)
    }

  },

  destroy: async (req, res) => {
    const {
      storeId
    } = req.params;
    try {
      const deleteStore = await PropertySchema.findByIdAndDelete(storeId);

      req.flash('success', `${deleteStore.storeEnglish} Deleted Successfully`)
      return res.redirect(`/dashboard/stores`)
    } catch (err) {
      req.flash('error', {
        message: 'Something Went wrong'
      })
      return res.redirect(`/dashboard/stores`)

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