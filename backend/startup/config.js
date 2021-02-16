const config = require('config');

module.exports = function () {

    if (!config.get('scalaApi')) {
        throw new Error('FATAL ERROR: scalaApi is not defined');
    }

    if (!config.get('token')) {
        throw new Error('FATAL ERROR: token is not defined');
    }

}