const mongoose = require('mongoose');
const config=require('../config/database')

// Defining the schema for Users
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        default : Math.random().toString(36).slice(2)
    }
});

// Naming and exporting  the user mongoose model
const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getAllUsers=function(callback){
    User.find(callback);
}


module.exports.addUser = function (user, callback) {
    User.create(user, callback);
};

module.exports.getUserByID = function (id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUserName = function (userName, callback) {
    let query = {
        userName: userName
    }
    User.findOne(query, callback)
}

module.exports.getUserByUserid = function (userid, callback) {
    let query = {
        userid: userid
    }
    User.findOne(query, callback)
}
