const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  console.log('check2')
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'client'),
    },
    // Upddate this using the 
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack App',
      }),
      console.log('check3'),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js'
      }),
      console.log('check4'),
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Edits Text',
        background_color: '#ffffff',
        crossOrigin: 'null',
    
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }), console.log('check5')
    ],
    
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            }
          }
        }
      ], 
    }, 
    devtool: 'source-map',
    
    devServer: {
      contentBase: path.join(__dirname, 'client/dist'),
      compress: true,
      port: 3000
    }
  } 
}
};
console.log('check6')