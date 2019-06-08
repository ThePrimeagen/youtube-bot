export default function createWebSocket(host, port) {
    const ws = new WebSocket(`ws://${host}:${port}`);

    ws.onopen = function() {
        console.log('I am open');
    };

    ws.onclose = function() {
        console.log('I am close');
    };

    ws.onerror = function(e) {
        console.log(e);
    };

    return ws;
};
