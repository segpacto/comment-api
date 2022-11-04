const ENV = process.env

module.exports = {
  port: 3000,
  basePATH: '/comment-api',
  swaggerUrl: 'http://localhost:3000/comment-api/swagger',
  swaggerUiPath: '/api-docs',
  db: {
    host: ENV.DB_HOST,
    username: ENV.DB_USER,
    password: ENV.DB_PASS,
    name: ENV.DB_NAME || 'graphs'
  },
  logging: {
    options: {
      timestamp: () => `,"time":"${new Date().toISOString()}"`,
      level: ENV.LOG_LEVEL || 'info',
      formatters: {
        level (label) {
          return { level: label }
        }
      },
      redact: {
        paths: [
          'config.*',
          'request.*',
          'response.request.*',
          'response.config.headers.Authorization',
          'config.headers.Authorization'
        ],
        remove: true
      },
      prettyPrint: ENV.LOG_PRETTY === 'true',
      messageKey: 'description'
    }
  }
}
