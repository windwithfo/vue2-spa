/**
 * @file 开发配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

import path           from 'path';
import Chalk          from 'chalk';
import baseConfig     from './base';
import webpack        from 'webpack';
import config         from '../config';
import merge          from 'webpack-merge';
import Html           from 'html-webpack-plugin';
import Linter         from 'stylelint-webpack-plugin';
import formatter      from 'eslint-friendly-formatter';
import ProgressBar    from 'progress-bar-webpack-plugin';
import FriendlyErrors from 'friendly-errors-webpack-plugin';

function resolve(dir) {
  return path.join(__dirname, '../../src', dir);
}

const createLintingRule = () => ({
  test: /\.js|ts|vue$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [
    resolve('views'),
    resolve('store'),
    resolve('plugins'),
    resolve('components'),
  ],
  options: {
    formatter: formatter,
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
});

const webpackConfig = merge(baseConfig, {
  mode: 'development',
  output: {
    path: config.output,
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[id].[hash].js',
    publicPath: config.dev.assetsPublicPath
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style', 'css']
      },
      {
        test: /\.less$/,
        use: ['vue-style', 'css', 'less']
      },
      ...(config.dev.useEslint ? [createLintingRule()] : [])
    ]
  },
  devtool: '#eval-source-map',
  performance: {
    hints: false
  },
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ]
    },
    hot: true,
    // since we use CopyWebpackPlugin.
    contentBase: false,
    compress: true,
    host: config.dev.host,
    port: config.dev.port,
    open: false,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    // necessary for FriendlyErrorsPlugin
    quiet: true,
    watchOptions: {
      poll: config.dev.poll
    },
    before(app) {
      app.get('/api/home.json', function (req, res) {
        res.json({ env: 'dev' });
      });
    }
  },
  // 插件项
  plugins: [
    new Html({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrors(),
    new ProgressBar({
      complete: Chalk.green('█'),
      incomplete: Chalk.white('█'),
      format: '  :bar ' + Chalk.green.bold(':percent') + ' :msg',
      clear: false
    }),
    ...(config.dev.useStylelint ? [new Linter({
      configFile: '.stylelintrc.js',
      files: ['src/**/*.less', 'src/**/*.vue'],
      ignorePath: 'node_modules/**',
      syntax: 'less'
    })] : [])
  ]
});

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

export default webpackConfig;
