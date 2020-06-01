// MQTT subscriber
require("./broker");
require("./pub");


var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1234')
var topic = 'val1'

var data
const express = require('express')
const app = express()
const port = 3000

client.on('message', (topic, message) => {
    message = message.toString()
    data = message
        //document.getElementById('data').innerHTML = message

    console.log(message)
})

client.on('connect', () => {
    client.subscribe(topic)
})



app.get('/', (req, res) => res.send(data))


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))