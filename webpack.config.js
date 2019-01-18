const path = require('path');
const staticMiddleware = require('./webpack-static-server/static-middleware');

module.exports = {
  entry: {
    app: './src/app.js',
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: 'http://localhost:3000/',
    path: path.join(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                path.join(__dirname, 'src'),
              ],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [
      'src',
      'node_modules',
    ],
    extensions: ['.js'],
  },
  watch: true,
  devtool: 'inline-cheap-module-source-map',
  devServer: {
    inline: true,
    port: 3000,
    contentBase: path.join(__dirname, 'dist/'),
    setup: (app) => {
      staticMiddleware(app); // get static files
    },
  },
};
