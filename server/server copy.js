require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require("axios");
const cache = require('./cache');
const cron = require('node-cron');
const Utils = require('./Utils');
const path = require('path');
require ('./configs/db.config');
const Member = require('./models/Member');

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

axios.get(`http://work.mediasmart.io?page=0&page_size=120`, {headers: {authorization: process.env.API_KEY}})
  .then(response => {
    let membersArr = response.data;
    response.data.forEach( (member, idx) => {
      membersArr[idx]._id= member.id
    });
    Member.collection.insertMany(membersArr)
  })
  .catch(err => console.log(err))



Utils.updateCache( cache.page, cache.membersBuffer, Utils.fixArr );

cron.schedule("* * * * *", function () {
  Utils.updateCache( cache.page, cache.membersBuffer, Utils.fixArr );
  console.log("Schedule task: updating cache from api call");
});




const apiRouter = require('./routes/api.routes');
app.use('/api', apiRouter);


app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports= app;















// app.get('/api/hello', (req, res) => {
//   res.send({ message: 'Hello, I am the server' });
// });

// app.get('/api/get', (req, res, next) => {
//   axios.get(`http://work.mediasmart.io?page=1&page_size=3`, {headers: {authorization:"mediasmart2019"}})
//   .then(response => {
//     console.log(response.headers["content-length"])
//     res.json(response.data)
//   })
//   .catch(err => console.log(err))
// })