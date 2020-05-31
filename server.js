const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';
const db= require('./Database/dbConnetion');
const policyroutes = require('./routes/routes')
const port = 5000;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 



app.get('/', (req, res)=>{
    res.send('index page');
})



app.use('/api/v1',policyroutes);



/** app listen */
app.listen(port, ()=>{
  logger.info(`server started successfully on ${port}`);
})