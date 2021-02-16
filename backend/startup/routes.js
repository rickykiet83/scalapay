const express = require('express');
require('express-async-errors');
const error = require('./../middleware/error');
const auth = require('./../middleware/auth');

const home = require('../routes/index.route');
const configurationRoute = require('../routes/configuration.route');

module.exports = function(app) {
    app.use(express.json());
    app.use('/', home);
    app.use('/api/configuration', auth, configurationRoute);
    app.use(error);
}