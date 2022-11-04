const mongoose = require('mongoose')

const logger = require('./../bootstrap/logger')
const modelsBuilder = require('./../db/models')

module.exports = ({ host, username, password, name }) => {
  const connection = mongoose.createConnection(host, {
    dbName: name,
    auth: { username, password }
  })

  connection.on('error', (err) => {
    logger.error(err)
  })

  connection.on('connected', () => {
    logger.info('connected to mongodb')
  })

  connection.on('disconnected', () => {
    logger.info('connection disconnected')
  })

  const { CommentNode } = modelsBuilder(connection)

  return {
    async getComment (commentId) {
      return CommentNode.findById(commentId)
    },
    async createComment (commentPayload) {
      const { ancestorsId } = commentPayload

      const comment = new CommentNode(commentPayload)

      const createdComment = await comment.save()

      await CommentNode.updateMany(
        { _id: { $in: ancestorsId } },
        { $push: { childs: comment } }
      )

      return createdComment
    }
  }
}
