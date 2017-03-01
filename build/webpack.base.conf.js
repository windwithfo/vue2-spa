/**
 * @file build file
 * @author dongkunshan
 */

import path    from 'path';
import webpack from 'webpack';
import config  from './config';
import postcss from 'postcss-cssnext';
import Extract from 'extract-text-webpack-plugin';

const projectRoot = path.resolve(__dirname, '../');

let plugins = [];

plugins.push(new webpack.optimize.CommonsChunkPlugin({
    names: ['vue', 'echarts', 'manifest']
}));

let extractStyl = new Extract({
    filename: '[name].[contenthash].css',
    disable: false,
    allChunks: true
});

plugins.push(extractStyl);

function assetsPath(_path) {
    let assetsSubDirectory = config.build.assetsSubDirectory;
    return path.posix.join(assetsSubDirectory, _path);
}

let webpackConfig = {
    entry: {
        vue: 'vue',
        echarts: 'ECharts',
        app: './src/main.js'
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
                loader: extractStyl.extract({
                    fallback: 'style',
                    use: [
                        {
                            loader: 'css'
                        }
                    ]
                })
            },
            {
                test: /\.less$/,
                loader: extractStyl.extract({
                    fallback: 'vue-style',
                    use: [
                        {
                            loader: 'css'
                        },
                        {
                            loader: 'less'
                        }
                    ]
                })
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
    },
    plugins
};

export default {
    ...webpackConfig
};
