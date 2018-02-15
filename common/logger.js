'use strict';

const pino = require('pino');

// Set logger options
const loggerOptions = {
    level: process.env.LOG_LEVEL || 'debug',
    prettyPrint: process.env.LOG_PRETTY_PRINT || true
};

// Create logger
const logger = pino(loggerOptions);

module.exports = logger;
