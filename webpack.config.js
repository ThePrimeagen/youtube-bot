const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/site/app/app.js',
    watch: true,
    plugins: [
        new CopyPlugin([{
            from: path.join(__dirname, 'src', 'site', 'index.html'),
            to: path.join(__dirname, 'static')
        }])
    ],
    optimization: {
		// We no not want to minimize our code.
		minimize: false
	},
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'static')
    }
};

