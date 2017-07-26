const path = require('path');

module.exports = {
    entry: "./src/App/index.tsx",

    output: {
        filename: "app.js",
        path: path.resolve(__dirname, './dist')
    },

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },

    module: {
        loaders: [{
            test: /\.tsx$/,
            loader: 'ts-loader',
            options: {
                configFileName: 'tsconfig.json'
            }
        }]
    },
    devServer: {
        stats: 'errors-only'
    }
};