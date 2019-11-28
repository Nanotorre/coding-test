require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cache = require('./cache');
const cron = require('node-cron');
const path = require('path');
const Utils = require('./Utils');

//Mongo config & db update 
require ('./configs/db.config');


const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


//Schedule update
cron.schedule('* 4 * * *', () => {
  Utils.seedDB(cache.page, cache.membersBuffer, Utils.fixArr, Utils.updateDBandCache)
  console.log("Schedule task: updating db & cache from api call");
}, {
  scheduled: true,
  timezone: "Europe/Madrid"
});

//Routes
const apiRouter = require('./routes/api.routes');
app.use('/api', apiRouter);


app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports= app;