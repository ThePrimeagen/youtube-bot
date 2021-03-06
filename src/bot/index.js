const path = require('path');
const fs = require('fs');
const tmi = require('tmi.js');
const WebSocket = require('ws');

const envPath = path.join(__dirname, '../../', '.env');
const env = JSON.parse(fs.readFileSync(envPath).toString());

const config = require('../config');

const options = {
    options: { debug: true },
    connection: {
        reconnect: true
    },
    identity: env,
    channels: ['#theprimeagen']
};

const client = new tmi.client(options);
client.connect();

// main point of contact
client.on('chat', function(channel, user, line, self) {
    if (self) {
        return;
    }

    if (user.username !== 'theprimeagen') {
        return;
    }

    const parts = line.split(' ');
    if (parts[0] !== '!yt') {
        return;
    }

    const youtubeLink = parts[1];
    const v_Idx = youtubeLink.indexOf('v=');
    if (!youtubeLink || v_Idx === -1) {
        return;
    }

    let id = youtubeLink;
    if (~youtubeLink.indexOf('http')) {
        // https://youtu.be/PFrOU4Ixy-w?t=57
        id = youtubeLink.
            split('?')[1].
            split('&').
            filter(k => ~k.indexOf('v='))[0].
            substring(2);
    }

    connections.forEach(ws => ws.send(id));
});

const wss = new WebSocket.Server({
    port: config.port
});

const connections = [];
wss.on('connection', function(ws) {
    connections.push(ws);
    console.log(`I got a connection {ws}`);
    ws.on('message', function(message) {
        console.log("I SHOULDN't HAVE YOU", message);
    });

    ws.on('close', function() {
        console.log('closing...');
        connections.splice(connections.indexOf(ws), 1);
    });
});

