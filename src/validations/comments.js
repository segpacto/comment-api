const COMMENT_TYPE_PROPOSAL = 'Proposal'

module.exports = {
  /**
   * Validation at the highest level possible (API)
   */
  validateAncestorsOnProposal: (req, res, next) => {
    const { body: comment } = req

    if (comment.type !== COMMENT_TYPE_PROPOSAL && comment.ancestorsId.length > 1) {
      const error = new Error('Only comments type Proposal are allowed to have multiple ancestors')
      return next(error)
    }
    next()
  }
}
