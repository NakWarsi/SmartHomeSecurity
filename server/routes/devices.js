var express = require('express');
var router = express.Router();
var device = require('../model/device');
const mqtt = require('mqtt');
var aes = require('aes256');
var client = mqtt.connect('mqtt://localhost:1883');
var Users = require('../model/user');

client.on('connect', function () {
    console.log('mqtt broker connected')
})



/* GET users listing. */
router.get('/', function(req, res) {
    device.getData((err,data)=>{
        if (err){
            res.json({
                success: false,
                msg: err  
            })
          }
          else{
              res.json({ 
                  success: true,
                  msg: data
              })
            }
    })
});


router.get('/interval', (req, res) => {
  arr = req.url.split('=')
  res.send("changing interval to "+arr[1]+" seconds");
  client.publish('interval',arr[1])
})


router.post('/', (req, res) => {
    key = "ad587dsf8976";

   // var decrypt = JSON.parse(aes.decrypt(key,req.body));
    console.log(req.body)
    if (!req.body.sensor || !req.body.userid){
        console.log("incomplete data")
    res.json({
        success: false,
        msg: 'incomplete data'
    });
}
    else {
        Users.getUserByUserid(req.body.userid, (err, recUser) => {
            console.log("in virtual sensors")
            if (err)
                res.json({
                    success: false,
                    msg: err
                });
            else {
                if (!recUser) {
                    console.log("user does not exist")
                    res.json({
                        success: false,
                        msg: 'User does not exists'
                    });
                } else {
                    device.addDevice(req.body, (err,recDevice) => {
                       // console.log(DATA)
                        if (err){
                            res.json({
                                success: false,
                                msg: err
                                
                            })
                          }
                        else{
                          //console.log(DATA)
                            res.json({ 
                                success: true,
                                msg: "data updated " 
                            })
                          }
                    })
                }
            }
        });
        
    }
});



module.exports = router;
