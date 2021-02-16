const express = require('express');
const logger = require('./startup/logging');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

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