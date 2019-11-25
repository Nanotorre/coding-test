const express = require('express');
const router  = express.Router();
const axios = require("axios");
const cache = require('../cache');
const Utils = require('../Utils');
const Member = require('../models/Member');

router.get('/members/:page', (req, res, next) => {
  // Member.find().limit(120).skip(0)
  Member.find().limit(cache.membersBuffer).skip(req.params.page)
  .then( response => console.log("%%%%%%" , response.length))

  if(cache.get(cache.page)) {
    console.log("cache playing")
    return res.json(cache.get(cache.page))
  }
  console.log("continua")
  axios.get(`http://work.mediasmart.io?page=${req.params.page}&page_size=${cache.membersBuffer}`, {headers: {authorization:"mediasmart2019"}})
  .then(response => {
    const fixedMembers = Utils.fixArr(response.data);
    cache.set(req.params.page, fixedMembers)
   
    res.json(fixedMembers)
  })
  .catch(err => console.log(err))


})


module.exports = router;
