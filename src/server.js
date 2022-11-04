const swagger = require('@apidevtools/swagger-express-middleware')
const swaggerUi = require('swagger-ui-express')
const express = require('express')
const path = require('path')

const commentController = require('./controllers/comment-controller')
const db = require('./services/db-service')

const app = express()
app.set('etag', false)

const router = express.Router()

const swaggerSpec = path.join(__dirname, '../swagger.json')
const swaggerJSON = require(swaggerSpec)
const config = require('./config')

module.exports = new Promise((resolve, reject) => {
  swagger(swaggerSpec, app, (err, middleware) => {
    const { basePATH, swaggerUrl, swaggerUiPath } = config

    if (err) {
      reject(err)
    }

    // Injecting Swagger middlewares
    app.use(
      swaggerUiPath,
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec, {
        swaggerOptions: {
          url: swaggerUrl
        }
      })
    )

    app.get(`${basePATH}/swagger`, (_, res) => res.json(swaggerJSON))

    app.use(
      middleware.metadata(),
      middleware.CORS(),
      middleware.parseRequest(),
      middleware.validateRequest()
    )

    const dbService = db(config.db)

    commentController({ router, services: { dbService } })

    app.use(basePATH, router)

    resolve(app)
  })
})
