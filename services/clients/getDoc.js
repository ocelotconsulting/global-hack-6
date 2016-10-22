const agent = require('../../src/agent')
const { couchUrl } = require('../config')

const getDoc = (db, id) =>
  agent.get(`${couchUrl}/${db}/${id}`)
  .then(({ body }) => body)
  .catch((err) => {
    if (err && err.status === 404) {
      return undefined
    }
    throw err
  })

module.exports = getDoc
