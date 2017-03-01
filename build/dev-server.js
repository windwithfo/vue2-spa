/**
 * @file build file
 * @author dongkunshan
 */

import opn             from 'opn';
import path            from 'path';
import express         from 'express';
import webpack         from 'webpack';
import config          from './config';
import check           from './check-versions';
import webpackConfig   from './webpack.dev.conf';
import proxyMiddleware from 'http-proxy-middleware';
import DevMiddleware   from 'webpack-dev-middleware';
import HotMiddleware   from 'webpack-hot-middleware';
import connect         from 'connect-history-api-fallback';
check.check();

const port = config.dev.port;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable;

const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = DevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
});

let hotMiddleware = HotMiddleware(compiler);
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        });
        cb();
    });
});

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
    let options = proxyTable[context];
    if (typeof options === 'string') {
        options = {
            target: options
        };
    }
    app.use(proxyMiddleware(context, options));
});

// handle fallback for HTML5 history API
app.use(connect());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

app.get('/mock/*', function (req, res) {
    let tmp = req.url.split('?');
    let mockPath = '/static' + tmp[0] + '.json' + (tmp[1] ? '?' + tmp[1] : '');
    console.log('get mock on path:' + mockPath);
    res.redirect(mockPath);
});

app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    let uri = 'http://localhost:' + port;
    console.log('Listening at ' + uri + '\n');
    // when env is testing, don't need open it
    if (process.env.NODE_ENV !== 'testing') {
        //opn(uri);
    }
});
