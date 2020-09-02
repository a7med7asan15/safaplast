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
    try{
      const areas = await AreaSchema.find();
    const type = await TypesSchema.find();
    const rooms = await RoomsSchema.find();
    const amen = await AmentiesSchema.find();
    return res.render('screens/propScreens/addPropScreen', {
      thisUser: req.user,
      csrfToken,
      areas,
      type,
      rooms,
      amen
    })

    }catch(err){
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
      price,
      desArabic,
      desEnglish,
      images,
      amenties
    } = req.body;
    const im = images.split(',')
    try {
      const areaObj = await AreaSchema.findById(nameArea);
      const prop = new PropertySchema({
        createdby : req.user.id,
        nameEnglish,
        nameArabic,
        type,
        price,
        rooms,
        mobileNumber,
        amenties,
        cityId: areaObj.parent,
        areaId: areaObj.id,
        Address: {
          desriptionArabic:desArabic,
          descriptionEnglish:desEnglish,
        },
        
      });
      for(i=0 ; i<im.length ; i++){
        prop.images.push({imageLink : im[i]});
      }
      await prop.save();
      

      req.flash('success', 'Property Added Succesfully')
      return res.json({err:false,message:"Property Added Successfuly"});

    } catch (err) {
      req.flash('success', 'Property Not Added ')
      return res.json({err:true,message:"Property Not Added "});

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
      return res.render('screens/propScreens/editPropScreen', {
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
      
      return res.render('screens/propScreens/editPropScreen', {
        thisUser: req.user,
        property: {},
        csrfToken
      })
    }

  },
  update: async (req, res) => {
    const {
      nameEnglish,
      nameArabic,
      mobileNumber,
      nameArea,
      type,
      rooms,
      price,
      desArabic,
      desEnglish,
      images,
      amenties
    } = req.body;
    let im = [];
    if(images){
       im = images.split(',');
    } 
    try {
      const updateProp = await PropertySchema.findById(req.query.id);
      let imagesLoop = [] ;
      if(im.length){
        for(i=0 ; i < im.length ; i++){
          imagesLoop.push({imageLink : im[i]});
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
      await updateProp.save();
  
      req.flash('success', 'Property Updated Succesfully')
      return res.json({err:false,message:"Property Updated Succesfully"});
      

    } catch (err) {
      req.flash('error', {
        message: 'Property Not Updated'
      })
      return  res.json({err:true,message:"Property NOT Updated"});
       
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
        "$or": [
          {
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


  }

}

module.exports = propertyService