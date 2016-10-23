const _ = require('underscore')
const findPrograms = require('./findPrograms')

module.exports = (req, res, next) =>
  findPrograms()
  .then(
    programs => res.json(_(programs).chain().map(p => [p.type, true]).object().keys().compact().value())
  )
  .catch(next)
