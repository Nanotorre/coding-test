require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cache = require('./cache');
const cron = require('node-cron');
const Utils = require('./Utils');
const path = require('path');
require ('./configs/db.config');


const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// Utils.updateCache( cache.page, cache.membersBuffer, Utils.fixArr );

// (async function () {
//   console.log("fire async")
//     // let promise = Utils.updateDB2( )
//     let promise = Utils.updateDB( cache.page, cache.membersBuffer, Utils.fixArr)
//     let result = await promise;
//     let nextPage = cache.page;
//     while(result.length > 0) {
//       console.log("db actualizada y resulta mas de 120. sigue")
//       result = [];
//       nextPage += 1;
//       promise = Utils.updateDB( nextPage, cache.membersBuffer, Utils.fixArr);
//       result = await promise;
//       console.log("result actualizado recursivo", result.length)
//     }
    
// })()



cron.schedule("* 4 * * *", function () {
  Utils.seedDB(cache.page, cache.membersBuffer, Utils.fixArr, Utils.updateDBandCache)
  console.log("Schedule task: updating db & cache from api call");
});


// cron.schedule("* * * * *", function () {
//   Utils.updateCache( cache.page, cache.membersBuffer, Utils.fixArr );
//   console.log("Schedule task: updating cache from api call");
// });



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