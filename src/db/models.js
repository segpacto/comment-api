const { Schema } = require('mongoose')
const mongooseAutopopulate = require('mongoose-autopopulate')

const ObjectId = Schema.ObjectId

const COMMENT_TYPES = {
  PROPOSAL: 'Proposal',
  QUESTION: 'Inquiry',
  REPLY: 'Reply'
}

const CommentNodeSchema = new Schema({
  type: {
    type: String,
    enum: [COMMENT_TYPES.PROPOSAL, COMMENT_TYPES.QUESTION, COMMENT_TYPES.REPLY]
  },
  childs: [{
    type: ObjectId, ref: 'CommentNode', autopopulate: true
  }],
  superAncestorId: {
    type: ObjectId, ref: 'CommentNode'
  },
  content: {
    type: String
  }
})

CommentNodeSchema.plugin(mongooseAutopopulate)

CommentNodeSchema.virtual('id').get(() => this._id)

CommentNodeSchema.set('toJSON', {
  virtuals: true
})

module.exports = connection => ({
  CommentNode: connection.model('CommentNode', CommentNodeSchema)
})
