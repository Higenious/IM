const policyModel = require('../models/polictyModel').policy;
const User_Account = require('../models/polictyModel').User_Account;
const userModel = require('../models/polictyModel').user;
const agentModel = require('../models/polictyModel').Agent;
const csv = require('csvtojson')
const fs = require('fs');
const csvtojson = require("csvtojson");
const path = require('path');
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';
var os 	= require('os-utils');

os.cpuUsage(function(v){
  console.log( 'CPU Usage (%): ' + v );
});

os.cpuFree(function(v){
	console.log( 'CPU Free:' + v );
});







/** upload csv  */
async function uploadCsv(req, res) {
  const csvName = req.file.originalname;
  let jsonArray = [];
  try {
    var m = __dirname.toString();
    var path_directory = m.replace('\controller', '');
    jsonArray = await csv().fromFile(path_directory + "/uploads/" + csvName);
    jsonArray.forEach((item) => {
      const result = policyModel(item).save();
      const agen = agentModel(item).save();
      const user = userModel(item).save();
      const User_Accoun = User_Account(item).save();
    })
    res.send('csv imported successuflly!');
  } catch (error) {
    logger.error(error);
  }
}






/** get policy information by username */
async function getPolicyInfo(req, res) {
  const { username } = req.body;
  logger.info('username', username);
  try {
    const result = await policyModel.find({ email: username });
    if (result.length == 0) {
      res.send('user policy is not available, make sure entered username is correct');
    } else {
      const resp = { 'message': "user policy fetched successfully", "data": result, "status": true }
      res.status(200).send(resp);
    }
  } catch (error) {
    logger.error(error);
  }
}











/** get Users */
function getUsers(req, res) {
  policyModel.aggregate([
    {
      '$lookup': {
        from: 'users',
        localField: 'email',
        foreignField: 'email',
        as: 'users'
      }
    },
    {
      "$unwind": "$users"
    },
    {
      '$lookup': {
        from: 'agents',
        localField: 'email',
        foreignField: 'email',
        as: 'agent'
      }
    },
    {
      "$unwind": "$agent"
    },
    {
      $lookup:
      {
        from: "user_accounts",
        localField: 'email',
        foreignField: 'email',
        as: "user_account"
      }
    },
    {
      $unwind: "$user_account"
    }])
    .then((result,err) => {
      if (result) {
        res.send(result);
      } else {
        logger.error(err);
      }
    })
}







/** module export */
module.exports.uploadCsv = uploadCsv;
module.exports.getPolicyInfo = getPolicyInfo;
module.exports.getUsers = getUsers;


/** CPU Utilization */
