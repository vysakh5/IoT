// MQTT publisher
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1234')
var topic = 'val1'
var message = 0


client.on('connect', () => {
    setInterval(() => {
        message = Math.floor((Math.random() * 1023) + 1)
        client.publish(topic, message.toString())

        console.log('Message sent!', message)
    }, 1000)
})