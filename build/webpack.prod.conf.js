/**
 * @file build file
 * @author dongkunshan
 */

import path           from 'path';
import webpack        from 'webpack';
import config         from './config';
import merge          from 'webpack-merge';
import base           from './webpack.base.conf';
import Html           from 'html-webpack-plugin';
import Compress       from 'compression-webpack-plugin';
import BundleAnalyzer from 'webpack-bundle-analyzer/lib/BundleAnalyzerPlugin';

const useMap = config.build.sourceMap;

function assetsPath(_path) {
  let assetsSubDirectory = config.build.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
}

let webpackConfig = merge(base, {
  mode: 'production',
  devtool: useMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    publicPath: '',
    filename: assetsPath('[name].[chunkhash].js'),
    chunkFilename: assetsPath('[id].[chunkhash].js')
  },
  plugins: [
    new Html({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    // new BundleAnalyzer({
    //   analyzerMode: 'static'
    // })
  ]
});

if (config.build.productionGzip) {
  webpackConfig.plugins.push(
    new Compress({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$' ),
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

export default webpackConfig;
