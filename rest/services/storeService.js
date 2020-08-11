const User = require('../models/Users');
const {
  AreaSchema
} = require('../models/citySchema');
const StoreSchema = require('../models/storeSchema');


const storeService = {
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
      const stores = await StoreSchema.paginate({}, options);
      return res.render('screens/storeScreens/listAllStores', {
        thisUser: req.user,
        csrfToken,
        stores
      })

    } catch (err) {
      res.send('error')
    }

  },
  addStorePage: async (req, res) => {
    let csrfToken = req.csrfToken();
    const areas = await AreaSchema.paginate();
    return res.render('screens/storeScreens/addStoreScreen', {
      thisUser: req.user,
      csrfToken,
      areas
    })

  },
  createStore: async (req, res) => {
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

    try {
      const areaObj = await AreaSchema.findById(storeArea);
      const user = await User.findById(storeOwner);
      const store = new StoreSchema({
        storeOwner,
        storeEnglish,
        storeArabic,
        mobileNumber,
        Address: {
          cityId: areaObj.parent,
          areaId: areaObj.id,
          addressArabic,
          addressEnglish,
          longtude,
          latitude
        }
      });
      await store.save();
      user.stores.push(store.id);
      user.save();

      req.flash('success', 'Store Added Succesfully')
      return res.redirect('/dashboard/stores');

    } catch (err) {


    }
  },

  showOne: async (req, res) => {
    req.session.lastlink = req.url
    let csrfToken = req.csrfToken();

    try {
      var {
        storeId
      } = req.params
      const areas = await AreaSchema.paginate();
      const storeToEdit = await StoreSchema.findById(storeId).populate('storeOwner');
      const areaSel = await AreaSchema.findById(storeToEdit.Address.areaId);
      return res.render('screens/storeScreens/editStoreScreen', {
        thisUser: req.user,
        storeToEdit: storeToEdit,
        areas,
        areaSel,
        csrfToken
      })
    } catch (err) {
      req.flash('error', 'Something Went wrong')
      return res.render('screens/variantScreens/editStoreScreen', {
        thisUser: req.user,
        storeToEdit: {},
        areas,
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
      const updateStore = await StoreSchema.findById(storeId);
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
      const deleteStore = await StoreSchema.findByIdAndDelete(storeId);

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

module.exports = storeService