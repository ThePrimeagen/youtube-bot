import config from '../../config';
import createWebSocket from './websocket';
import createYouTubePlayer from './youtube';

function createPlayer() {
    const player = document.createElement('div');
    player.setAttribute('id', 'player');

    document.body.appendChild(player);
}

function removePlayer() {
    const player = document.getElementById('player');
    if (player) {
        document.body.removeChild(player);
    }
}

async function start() {
    const ws = createWebSocket(config.host, config.port);
    const createVideo = await createYouTubePlayer();

    ws.onmessage = function(msg) {
        removePlayer();
        createPlayer();

        console.log(`We are about to play ${msg.data}`);
        createVideo('player', msg.data, function(command) {
            if (command === 'stop') {
                removePlayer();
            }
        });
    };
}

start();

