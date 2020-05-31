const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const policySchema = new Schema({
    policy_number :{type:String},
    policy_type : {type:String},
    policy_start_date : {type:String},
    policy_end_date : {type:String},
    premium_amount : {type:String},
    company_name : {type:String},
    category_name : {type:String},
    csr : {type:String},
    userType : {type:String},
    account_name : {type:String},
    producer : {type:String},
    premium_amount : {type:String},
    email: {type:String}
})


const User_Account = new Schema({
    account_name : {type:String},
    email : {type:String},
    policy_number : {type:String}
})

const user = new Schema({
    firstname : {type:String},
    dob :{type:String},
    address : {type:String},
    phone : {type:String},
    state : {type:String},
    zip:{type:String},
    email : {type:String},
    gender : {type:String},
    city :{type:String}, 
    userType : {type:String},
    policy_number : {type:String},
    agent : {type:String},
})


const Agent = new Schema({
    Agent :{type:String},
    email : {type:String},
    policy_number : {type:String}

})



module.exports.policy = mongoose.model('policy', policySchema);
module.exports.user =  mongoose.model('user', user);
module.exports.User_Account = mongoose.model('User_Account',User_Account);
module.exports.Agent = mongoose.model('agent', Agent);