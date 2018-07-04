var express = require('express')
var router = express.Router();
var request = require('request');
var aes=require("aes256");
var key = "ad587dsf8976";
const mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost:1883');
//var db_sensor = require('../mongoose/database');
let message;

var connectCallback = function () {
    console.log('mqtt broker connected')
    client.subscribe('question2')
}

client.on('message', function (topic, msg) {   
    message = JSON.parse(msg);   
    let DATA = {
        sensor: message.sensor,
        temperature: message.temperature,
        humidity: message.humidity,
        userid:message.userid
    }
    //var encrypt= aes.encrypt(key,JSON.stringify(data));
    var options = {
        uri: "http://localhost:4003/device",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(DATA)
    };
    //console.log(options.body);
    request.post(options, (err, res, body) => {
        //console.log("request is working");
    });
 //client.end()
})
client.on('connect', connectCallback)
module.exports = router;