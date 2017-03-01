/**
 * @file build file
 * @author dongkunshan
 */

import 'shelljs/global';
import ora     from 'ora';
import path    from 'path';
import webpack from 'webpack';
import config  from './config';
import scp     from 'child_process';
import check   from './check-versions';
import Config  from './webpack.prod.conf';
check.check();

const spinner = ora('building for production...');
const assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);

spinner.start();

rm('dist.zip');
rm('-rf', config.build.assetsRoot);
mkdir('-p', assetsPath);
cp('-R', 'static/*', assetsPath);

webpack(Config, function (err, stats) {
    spinner.stop();
    if (err) {
        throw err;
    }
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n');
    let cmd = 'zip -r dist.zip dist';
    scp.exec(cmd, function (data) {
        if (!data) {
            console.log('zip sucess');
        }
        else {
            console.log(data);
        }
    });
});
