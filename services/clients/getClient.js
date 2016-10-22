const getDoc = require('./getDoc')

const getClient = ({ params: { id } }, res) =>
  getDoc('clients', id)
  .then((doc) => res.send(doc))

module.exports = getClient
