const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      // install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      hot: "only",
    },
    plugins: [
      new HtmlWebpackPlugin({ //will create a index.html file in dists folder using template
        title: 'Production html file',
        template: './index.html',
      }),
      new InjectManifest({ //will create a service worker based on the "schema" for more control. 
        swSrc: '/src-sw.js',
        swDest: 'service-worker.js'
      }),
      //creates a manifest.json that can bring the app outside of the browser
      new WebpackPwaManifest({
        name: "Just Another Text Editor",
        short_name: "JATE",
        description: "Text editor that you can save, load, and it persists!",
        background_color: "#fca311",
        theme_color: "#fca311",
        start_url: '/',
        icons: [{
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
        }],
      })
    ],

    module: {
      rules: [
        //loaders preprocesses the files
        { //loader for CSS, helps the wbepack compile css into javascript
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        { //loader for JS, converts next gen Javascript into browser compatible javascript
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          loader: 'file-loader',
          options: {
            name: '/assets/icons/[name].[ext]'
          }
        }
      ],
    },
  };
};
