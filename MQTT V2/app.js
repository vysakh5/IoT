const mosca = require('mosca');
const express = require('express');


const moscaSettings = {
    port: 1883,
};

const app = express();
const server = new mosca.Server(moscaSettings);
const port = process.env.PORT || 3000;

server.on('clientConnected', client => {
    console.log('client connected', client.id);
});

// Received a  message
server.on('published', (packet, client) => {
    console.log('Published', packet.payload);
});

// Server is Ready
server.on('ready', () => {
    console.log('Mosca server is up and running');
});

// send to clients
const publishData = (topic, payload) => {
    var message = {
        topic: topic,
        payload: payload,
        qos: 0,
        retain: false
    };
    server.publish(message, () => {
        console.log('done!');
    });
}

app.get('/', function(req, res, next) {
    let topic = '/' + req.query.topic;
    let payload = req.query.payload;
    publishData(topic, payload);
    res.send(`Published ${payload} to ${topic}`);
})

app.listen(port, () => {
    console.log(`Express server listening on port : ${port}`)
})