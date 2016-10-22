const getAll = require('./getAll')

module.exports = (id) =>
  getAll({ key: JSON.stringify(id) })
  .then(([result]) => result)
