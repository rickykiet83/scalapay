const express = require('express');
require('express-async-errors');
const error = require('./../middleware/error');

const home = require('./../routes/index');
const configuration = require('./../routes/configuration');

module.exports = function(app) {
    app.use(express.json());
    app.use('/', home);
    app.use('/api/configuration', configuration);
    app.use(error);
}