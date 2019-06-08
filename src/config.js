const fs = require('fs');
const path = require('path');

let exportsObject = {
    port: 8080,
    host: 'theprimeagen.com'
};

if (fs.existsSync(path.join(__dirname, './config.override.js')) {
    exportsObject = require('./config.override.js');
}

module.exports = exportsObject;

