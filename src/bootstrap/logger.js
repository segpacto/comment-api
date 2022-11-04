const config = require('../config')
const pino = require('pino')
const logger = pino(config.logging.options)
module.exports = logger
