const express = require('express');
const logger = require('./startup/logging');
const app = express();

require('./startup/routes')(app);

process.on('uncaughtException', (ex) => {
    logger.error(ex.message);
});

process.on('unhandledRejection', (ex) => {
    throw ex;
});

module.exports = app;