const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/insured";
const log4js = require('log4js');
const logger = log4js.getLogger('database');
logger.level = 'debug';


mongoose.connect(url,{ useUnifiedTopology: true },(err, result)=>{
    if(err){
        logger.error('error while conecting database');
    }else{
        logger.debug('database connected successfully!')
    }
}) 