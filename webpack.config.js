const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path')

const clientConfig = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'file-loader',
        options: {
          name: 'public/media/[name].[ext]',
          publicPath: url => url.replace(/public/, '')
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            },
            {
              loader: 'postcss-loader',
              options: { plugins: [autoprefixer()] }
            }
          ]
        })
      },
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: { presets: ['react-app'] }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'public/[name].css'
    })
  ]
};

const serverConfig = {
  entry: './server/index.js',
  target: 'node',
  output: {
    path: __dirname,
    filename: './public/server.js',
    libraryTarget: 'commonjs2'
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'file-loader',
        options: {
          name: 'public/media/[name].[ext]',
          publicPath: url => url.replace(/public/, ''),
          emit: false
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader/locals' // server needs to know about css
          }
        ]
      },
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: { presets: ['react-app'] }
      }
    ]
  }
};

module.exports = [clientConfig, serverConfig];