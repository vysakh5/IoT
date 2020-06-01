const functions = require('firebase-functions');
const express = require('express');
const app = express();
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1234')
var topic = 'val1'
const port = 3000
var data
require("./broker");
require("./pub");


client.on('message', (topic, message) => {
    message = message.toString()
    data = message
        //document.getElementById('data').innerHTML = message

    console.log(message)
})

client.on('connect', () => {
    client.subscribe(topic)
})


app.get('/helo', (req, res) => {
    setInterval(() => {
        res.send(data)
        
    }, 1000)

});


// // Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app);