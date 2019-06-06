const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
    console.log('I am open');
};
ws.onmessage = m => {
    console.log('I am message', m);
};
ws.onerror = e => {
    console.log('I am error', e);
};
ws.onclose = () => {
    console.log('I am close :(');
};

