/**
 * @file build file
 * @author dongkunshan
 */

import chalk  from 'chalk';
import semver from 'semver';
import cp     from 'child_process';
import config from '../package.json';

const exec = function (cmd) {
    return cp.execSync(cmd).toString().trim();
};

let versionRequirements = [{
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: config.engines.node
}, {
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: config.engines.npm
}];

function check() {
    let warnings = [];
    for (let i = 0; i < versionRequirements.length; i++) {
        let mod = versionRequirements[i];
        if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
            warnings.push(
                mod.name + ': '
                + chalk.red(mod.currentVersion) + ' should be '
                + chalk.green(mod.versionRequirement)
            );
        }
    }

    if (warnings.length) {
        console.log('==========');
        console.log(chalk.yellow('To use this template, you must update following to modules:'));
        console.log('==========');
        for (let i = 0; i < warnings.length; i++) {
            let warning = warnings[i];
            console.log('  ' + warning);
        }
        console.log('==========');
        process.exit(1);
    }
}

export default {
    check
};
