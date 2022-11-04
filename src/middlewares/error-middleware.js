const HttpStatus = require('http-status-codes')

module.exports = (err, req, res, next) => {
  const status = err.isBoom
    ? err.output.statusCode
    : err.response
      ? err.response.status
      : err.code === 11000
        ? HttpStatus.CONFLICT
        : err.status || 500

  const responsePayload = {
    error: HttpStatus.getStatusText(status),
    message: err.isBoom ? err.output.payload.message : err.message,
    statusCode: status
  }

  const logError = {
    stack: err.stack,
    url: err.config && err.config.url,
    headers: err.config && { ...err.config.headers },
    responsePayload
  }

  req.log.error({ error: logError }, err.message)
  res.status(status)
  res.send(responsePayload)
}
