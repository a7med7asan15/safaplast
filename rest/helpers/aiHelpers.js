
const util = require('util')
const vision = require('@google-cloud/vision');
const client = new vision.ProductSearchClient();

const location = process.env.location;
const productSetId = process.env.defaultproductsetid
const projectId = process.env.projectId;
const defaultProductCategory = process.env.defaultproductcategory
const imageLink = async (imagename) => {
    var finalLink =  await util.format(process.env.bucketfileformat, process.env.bucket, imagename)
     return finalLink
  };

const clientProd = new vision.ProductSearchClient({
    projectId : projectId,
    keyFilename: process.env.authkeyfile
  })

const  locationPath = clientProd.locationPath(projectId , location)


const aiHelpers = {

     imageLink : async (imagename) => {
        var finalLink =  await util.format(process.env.bucketfileformat, process.env.bucket, imagename)
         return finalLink
      }
}
const  productSetPath = clientProd.productSetPath(projectId,location,productSetId);



module.exports = {
    aiHelpers,
    projectId,
    location,
    clientProd,
    locationPath,
    productSetId,
    productSetPath,
    defaultProductCategory,
    imageLink
}