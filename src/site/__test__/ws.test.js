const WebSocket = require('ws');
const config = require('../config');

const ws = new WebSocket(`ws://${config.host}:${config.port}`);

ws.on('open', function open() {
    console.log("I AM OPEN");
    ws.send('this is open');
});

ws.on('message', function incoming(data) {
    console.log("I AM message", data);
});

