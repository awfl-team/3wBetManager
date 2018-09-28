const path = require('path');

function buildConfig(env) {
    env = env || 'prod';

    return require(path.resolve(__dirname, 'webpack/' + env + '.js'))({ env: env })
}

module.exports = buildConfig;
