const mongoose = require ('mongoose');
const Utils = require('../Utils');
const cache = require('../cache');

mongoose
.connect(process.env.MONGO_URL, {useNewUrlParser: true})
.then( x => {

  console.log(`Connected to Mongo Atlas"`)
  Utils.seedDB(cache.page, cache.membersBuffer, Utils.fixArr, Utils.updateDBandCache)
  
})
.catch(err => {
  console.error('Error connecting to mongo', err)
});