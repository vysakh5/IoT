// MQTT publisher
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1234')
var topic = 'pwm1'
var n = 10

client.on('connect', () => {
    setInterval(() => {
        n = Math.floor((Math.random() * 1023) + 1)
        m = Math.floor((Math.random() * 1023) + 1)
        o = Math.floor((Math.random() * 1023) + 1)

        client.publish(topic, n.toString())
        client.publish("pwm2", m.toString())
        client.publish("pwm3", o.toString())
    }, 1000)
})