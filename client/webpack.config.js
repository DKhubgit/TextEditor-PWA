const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({ //will create a index.html file in dists folder using template
        title: 'Production html file',
        template: './index.html',
      }),
      //add a injectManifest plugin for service worker

      //add a manifest file (i beleive this is for installing the app)
    ],

    module: {
      rules: [
        //loaders preprocesses the file
        { //loader for CSS
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        { //loader for JS
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ],
    },
  };
};
