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
      return response.length > 0 ?
          res.json(response)
        : 
        Utils.seedDB(cache.page, cache.membersBuffer, Utils.fixArr, Utils.updateDBandCache);
    })
    .catch(err => console.log(err))
});


module.exports = router;
