const findPrograms = require('./findPrograms')

module.exports = ({ query: { type } }, res, next) =>
  findPrograms(type)
  .then(programs => res.json(programs))
  .catch(next)
