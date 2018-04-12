/**
 * @file build file
 * @author dongkunshan
 */

import path           from 'path';
import Chalk          from 'chalk';
import webpack        from 'webpack';
import merge          from 'webpack-merge';
import config         from './webpack.base.conf';
import Html           from 'html-webpack-plugin';
import Linter         from 'stylelint-webpack-plugin';
import ProgressBar    from 'progress-bar-webpack-plugin';
import FriendlyErrors from 'friendly-errors-webpack-plugin';
import BundleAnalyzer from 'webpack-bundle-analyzer/lib/BundleAnalyzerPlugin';

// add hot-reload related code to entry chunks
Object.keys(config.entry).forEach(function (name) {
  config.entry[name] = ['./build/dev-client'].concat(config.entry[name]);
});

const projectRoot = path.resolve(__dirname, '../');

const webpackConfig = merge(config, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        enforce: 'pre',
        use: [{
          loader: 'eslint',
          options: {
            configFile: './.eslintrc.js'
          }
        }],
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: [{
          loader: 'eslint',
          options: {
            configFile: './.eslintrc.js'
          }
        }],
        include: projectRoot,
        exclude: /node_modules/
      }
    ]
  },
  performance: {
    hints: false
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new Linter({
      configFile: '.stylelintrc.js',
      files: ['src/**/*.vue', 'src/**/*.less'],
      ignorePath: 'node_modules/**',
      syntax: 'less'
    }),
    new Html({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrors(),
    new ProgressBar({
      complete: Chalk.green('█'),
      incomplete: Chalk.white('█'),
      format: '  :bar ' + Chalk.green.bold(':percent') + ' :msg',
      clear: false
    }),
    new BundleAnalyzer({
      analyzerMode: 'static'
    })
  ]
});

export default webpackConfig;
