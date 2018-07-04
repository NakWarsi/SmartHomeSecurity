const mongoose=require('mongoose')
const config=require('../config/database')

//user schema
const UserSchema=mongoose.Schema({
    sensor:{
        type:String,
         unique: true,
         required: true
    },
    temperature:{
        type:String,
       //required:true
    },
    humidity:{
        type:String,
        //required:true
    },
    time:{
        type:String,
       // required:true
    },
    userid: {
        type: String,
        required: true
    }
})

const Device=module.exports=mongoose.model('devices',UserSchema)


module.exports.addDevice=function(device,callback){
    Device.create(device,callback);
}

module.exports.getData=function(callback){
    Device.find(callback);
}

module.exports.GetDevicesByUserId=function(userid,callback){
    let query = {
        userid: userid
    }
    Device.find(query,callback);
}