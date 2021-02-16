const express = require('express');
const logger = require('./startup/logging');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./startup/config')(app);
require('./startup/routes')(app);
require('./startup/prod')(app);

process.on('uncaughtException', (ex) => {
    logger.error(ex.message);
});

process.on('unhandledRejection', (ex) => {
    throw ex;
});

module.exports = app;