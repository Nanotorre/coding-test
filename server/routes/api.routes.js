const express = require("express");
const router = express.Router();
const axios = require("axios");
const cache = require("../cache");
const Utils = require("../Utils");
const Member = require("../models/Member");

router.get("/members/:page", (req, res, next) => {
  if (cache.get(cache.page)) {
    console.log("returning from cache", cache.get(cache.page).length);
    return res.json(cache.get(cache.page));
  }
  console.log("trying from db")
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


// router.get("/members1/:page", (req, res, next) => {

//   if (cache.get(cache.page)) {
//     return res.json(cache.get(cache.page));
//   }
//   Member.find()
//     .limit(cache.membersBuffer)
//     .skip(+req.params.page)
//     .then(response => {
//       return response.length > 0 ?
//           res.json(response)
//         : axios
//             .get(
//               `http://work.mediasmart.io?page=${req.params.page}&page_size=${cache.membersBuffer}`,
//               { headers: { authorization: process.env.API_KEY } }
//             )
//             .then(response => {
//               const fixedMembers = Utils.fixArr(response.data);
//               cache.set(req.params.page, fixedMembers);
//               fixedMembers.forEach( (member, idx) => {
//                 fixedMembers[idx]._id= member.id
//               });
//               Member.collection.insertMany(fixedMembers);
//               res.json(fixedMembers);
//             })
//             .catch(err => console.log(err));
//     })
//     .catch(err => console.log(err))

 
// });

module.exports = router;
