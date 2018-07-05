/**
 * @file 基础配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

import path       from 'path';
import webpack    from 'webpack';
import config     from '../config';
import CopyPlugin from 'copy-webpack-plugin';
import manifest   from '../../static/vendor-manifest';

import { VueLoaderPlugin } from 'vue-loader';

const webpackConfig = {
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../../'),
      path.resolve(__dirname, '../../node_modules')
    ],
    alias: {
      component: 'src/components',
      asset: 'src/assets',
      view: 'src/views'
    },
    extensions: ['.js', '.ts', '.vue', '.json', '.less', '.css']
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: 'pug-plain'
      },
      {
        test: /\.ts$/,
        use: [
          'babel',
          {
            loader: 'ts',
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel',
        },
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        use: {
          loader: 'json'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url',
          options: {
            limit: 10000,
            name: 'img/[name].[hash:7].[ext]'
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url',
          options: {
            limit: 10000,
            name: 'fonts/[name].[hash:7].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DllReferencePlugin({
      manifest
    }),
    new CopyPlugin([{
      from: path.resolve(__dirname, '../../static'),
      to: config.dev.assetsSubDirectory,
      ignore: ['.*']
    }]),
  ]
};

export default webpackConfig;
