const webpack = require("webpack");

module.exports = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          },
          {
            loader: 'babel-loader'
          }
        ],
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "less-loader" },
        ],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".ts", ".tsx", ".js", ".jsx", ".less"],
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "bundle.js",
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    static: {
      directory: 'dist',
    },
    hot: true,
  },
};
