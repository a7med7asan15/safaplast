// checker controller routes
var express = require('express');
var router = express.Router();
var secret = require('../config/secret');

// get /api/checker/
router.post('/',(req,res) => {
  if(req.body.checkToken === secret.CHECK ){
    return res.send({er:false,message:'App Have Access'});
  } 
  return res.send({err:true,no:10,message:'App is Prohibited'})
});

module.exports = router;