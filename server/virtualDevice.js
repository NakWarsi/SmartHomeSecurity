const mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost:1883');
const arr = ["dht11", "PIR", "DHT22"]
const sen = ["nak1", "mihir", "nakwarsi"]
var interval_time = 1
var it = 5;
var interval = -1;


function sentData()
{
       let data = {
            sensor: arr[Math.floor((Math.random() * 5).toFixed(2))],
            temperature: (Math.random() * 100).toFixed(2),
            humidity: (Math.random() * 100).toFixed(2),
            userid: sen[Math.floor((Math.random() * 3).toFixed(2))]
        }
        console.log('sent');      
        client.publish('question2', JSON.stringify(data))
        it = interval_time
}


var connectCallback = function () {
    console.log('mqtt broker connected')
    client.subscribe('interval')
    interval = setInterval(sentData, 1000 * it)
}

client.on('message', (topic, int) => {
    console.log('new Interval time received');
    interval_time = parseInt(int, 10)
    clearInterval(interval);
    interval = setInterval(sentData, 1000 * interval_time)
    console.log(typeof (interval_time) + interval_time);
})
client.on('connect', connectCallback)