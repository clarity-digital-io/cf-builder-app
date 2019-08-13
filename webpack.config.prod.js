const webpack = require('webpack');
const path = require('path');
const fs  = require('fs');
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './ant-theme-vars.less'), 'utf8'));

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: { 
              loader: 'babel-loader', 
              options: {
                plugins: [["import", { "libraryName": "antd", "style": true }]]
              }
            }
          },
          {
            test: /\.less$/,
            use: [
              {loader: "style-loader"},
              {loader: "css-loader"},
              {loader: "less-loader",
                options: {
                  javascriptEnabled: true,
                  modifyVars: themeVariables
                }
              }
            ]
          }
        ]
      },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.less']
    },
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'bundle.js'
    }
};