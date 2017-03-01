/**
 * @file build file
 * @author dongkunshan
 */

// see http://vuejs-templates.github.io/webpack for documentation.
import path from 'path';

export default {
    build: {
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '',
        sourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        port: 8080,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/api/**': {
                // target: 'http://192.168.2.20:8090'
                target: 'http://10.165.0.120:8080'
            }
        }
    }
};
