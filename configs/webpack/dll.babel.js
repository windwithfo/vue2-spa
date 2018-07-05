/**
 * @file 开发配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

import path           from 'path';
import Chalk          from 'chalk';
import webpack        from 'webpack';
import ProgressBar    from 'progress-bar-webpack-plugin';
import FriendlyErrors from 'friendly-errors-webpack-plugin';

const webpackConfig = {
  mode: 'production',
  entry: {
    vendor: [
      'vue',
      'vuex',
      'vue-router',
      'isomorphic-fetch'
    ]
  },
  output: {
    path: path.join(__dirname, '../../static'),
    filename: 'dll.[name].js',
    library: '[name]'
  },
  plugins: [
    new FriendlyErrors(),
    new ProgressBar({
      complete: Chalk.green('█'),
      incomplete: Chalk.white('█'),
      format: '  :bar ' + Chalk.green.bold(':percent') + ' :msg',
      clear: false
    }),
    new webpack.DllPlugin({
      path: path.join(__dirname, '../../static', '[name]-manifest.json'),
      name: '[name]'
    })
  ]
}

export default webpackConfig;
