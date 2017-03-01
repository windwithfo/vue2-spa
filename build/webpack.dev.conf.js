/**
 * @file build file
 * @author dongkunshan
 */

 import path    from 'path';
 import webpack from 'webpack';
 import merge   from 'webpack-merge';
 import config  from './webpack.base.conf';
 import Html    from 'html-webpack-plugin';
 import Linter  from 'stylelint-webpack-plugin';

// add hot-reload related code to entry chunks
Object.keys(config.entry).forEach(function (name) {
    config.entry[name] = ['./build/dev-client'].concat(config.entry[name]);
});

const projectRoot = path.resolve(__dirname, '../');

const webpackConfig = merge(config, {
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
            configFile: 'build/stylelintrc.config.js',
            files: 'src/**/*.vue',
            ignorePath: 'node_modules/**',
            syntax: 'less'
        }),
        new Html({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
});

export default {
    ...webpackConfig
};
