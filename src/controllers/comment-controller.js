const { validateAncestorsOnProposal } = require('../validations/comments')

module.exports = ({ router, services: { dbService } }) => {
  router.post('/comment', validateAncestorsOnProposal, async (req, res) => {
    const { body: comment } = req

    const createdComment = await dbService.createComment(comment)

    res.send(createdComment)
  })

  router.get('/comment/:commentId/graph', async (req, res) => {
    const { commentId } = req.pathParams
    const comment = await dbService.getComment(commentId)
    
    res.send(comment)
  })
}
