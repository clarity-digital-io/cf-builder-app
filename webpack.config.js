const webpack = require('webpack');

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
                  javascriptEnabled: true
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
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    }
};