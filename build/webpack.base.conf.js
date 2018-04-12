/**
 * @file build file
 * @author dongkunshan
 */

import path    from 'path';
import config  from './config';
import postcss from 'postcss-cssnext';
import Extract from 'mini-css-extract-plugin';

const projectRoot = path.resolve(__dirname, '../');

function assetsPath(_path) {
  let assetsSubDirectory = config.build.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
}

let webpackConfig = {
  entry: {
    app: './src/main.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendor1: {
          name: 'vue',
          test: /node_modules\/vue/,
          priority: 10,
          enforce: true
        },
        vendor2: {
          name: 'mint',
          test: /node_modules\/mint-ui/,
          priority: 10,
          enforce: true
        },
        style: {            
          name: 'style',
          test: /\.css/,
          chunks: 'all',
          minChunks: 1,
          enforce: true
        }
      }
    }
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].js'
  },
  resolve: {
    modules: [
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../node_modules'),
      'node_modules'
    ],
    extensions: ['.js', '.vue', 'less'],
    alias: {
      'vue$': 'vue/dist/vue.min.js',
      'common': 'assets/js',
      'component': 'components',
      'plugin': 'plugins',
      'ECharts': 'vue-echarts/components/ECharts.vue'
    }
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue',
          options: {
            postcss: [
              postcss()
            ]
          }
        }],
        include: projectRoot
      },
      {
        test: /\.css$/,
        use: [Extract.loader, 'css']
      },
      {
        test: /\.less$/,
        use: [Extract.loader, 'css', 'less']
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel',
          options: {
            presets: ['es2015']
          }
        }],
        include: [
          path.join(projectRoot, 'src'),
          path.join(projectRoot, 'node_modules/vue-echarts')
        ],
        exclude: /node_modules(?![\\/]vue-echarts[\\/])/
      },
      {
        test: /\.json$/,
        use: [{
          loader: 'json'
        }]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'url',
          options: {
            limit: 10000,
            name: assetsPath('img/[name].[hash:7].[ext]')
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
          loader: 'url',
          options: {
            limit: 10000,
            name: assetsPath('fonts/[name].[hash:7].[ext]')
          }
        }]
      }
    ]
  }
};

export default webpackConfig;
