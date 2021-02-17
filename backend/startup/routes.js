const express = require('express');
require('express-async-errors');
const error = require('./../middleware/error');
const auth = require('./../middleware/auth');

const home = require('../routes/index.route');
const configurationRoute = require('../routes/configuration.route');
const orderRoute = require('../routes/order.route');
const getOptionHeader = require('../middleware/header');

module.exports = function (app) {
    app.use(express.json());
    app.use('/', home);
    app.use('/api/configurations', auth, getOptionHeader, configurationRoute);
    app.use('/api/orders', auth, getOptionHeader, orderRoute);
    app.use(error);
}