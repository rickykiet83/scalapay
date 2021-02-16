const config = require('config');
const winston = require('winston');
const {
    createLogger,
    format,
    transports,
} = winston;


function getLogger() {
    const logger = createLogger({
        level: 'info',
        format: format.json(),
        defaultMeta: {},
        transports: [
            //
            // - Write all logs with level `error` and below to `error.log`
            // - Write all logs with level `info` and below to `combined.log`
            //
            new transports.Console({
                format: format.combine(
                    format.timestamp(),
                    format.colorize(),
                    format.simple()
                )
            }),
            new transports.File({
                filename: 'error.log',
                level: 'error',
            }),
        ],
    });

    //
    // If we're not in production then **ALSO** log to the `console`
    // with the colorized simple format.
    //
    if (process.env.NODE_ENV !== 'production') {
        logger.add(new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }));
    }

    return logger;
}

module.exports = function (err, req, res, next) {

    const logger = getLogger();
    logger.error(err.message, err);

    // Log the exception
    res.status(500).send('Something wrong!');
}