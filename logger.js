const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
    level: 'silly',
    transports: [ new transports.Console() ],
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.colorize(),
        format.simple()
    )
});