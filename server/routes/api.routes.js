const express = require("express");
const router = express.Router();
const cache = require("../cache");
const Utils = require("../Utils");
const Member = require("../models/Member");

router.get("/members/:page", (req, res, next) => {
  if (cache.get(cache.page)) {
    return res.json(cache.get(cache.page));
  }
  Member.find()
    .limit(cache.membersBuffer)
    .skip(+req.params.page)
    .then(response => {
       if (response.length > 0) {
        return res.json(response)
       } 
       else {
        Utils.seedDB(req.params.id, cache.membersBuffer, Utils.fixArr, Utils.updateDBandCache)
        .then( responseFromApi => {
          return res.json(responseFromApi);
        })
        .catch(err => console.log(err))
       }
       
    })
    .catch(err => console.log(err))
});

module.exports = router;